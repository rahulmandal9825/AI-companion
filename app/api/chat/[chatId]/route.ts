import { StreamingTextResponse, LangChainStream, LangChainAdapter } from "ai";

import { Replicate } from "@langchain/community/llms/replicate";
import { NextResponse } from "next/server";
import { MemoryManager } from "@/lib/memory";
import { ratelimit } from "@/lib/rate-limit";
import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CallbackManager } from "@langchain/core/callbacks/manager";


export async function POST(
    request: Request,
    { params }: { params: { chatId: string } }) {
    try {
        const { prompt } = await request.json();
        const user = await currentUser();
        if (!user || !user.firstName || !user.id) {
            return new NextResponse("unauthorized", { status: 401 })
        }
        const identifier = request.url + "-" + user.id;

        const { success } = await ratelimit(identifier);

        if (!success) return new NextResponse("Rate Limit Exceeded. Too many requests", { status: 429 });

        const companion = await prismadb.companion.update({
            where: {
                id: params.chatId
            },
            data: {
                messages: {
                    create: {
                        content: prompt,
                        role: "user",
                        userId: user.id
                    }

                }
            }
        });
        if (!companion) {
            return new NextResponse("companion not found ", { status: 404 })

        }

        const name = companion.id

        const companion_file_name = name + ".txt";
        const companionKey = {
            companionName: name,

            userId: user.id,
            modelName: "llama2-13b"
        }


        const memoryManger = await MemoryManager.getInstance()

        const records = await memoryManger.readLatestHistory(companionKey)

        if (records.length === 0) {
            await memoryManger.seedChatHistory(companion.seed, "\n\n", companionKey);
        }

        await memoryManger.writeToHistory("User: " + prompt + "\n", companionKey)

        const recentChatHistory = await memoryManger.readLatestHistory(companionKey)

        const similarDocs = await memoryManger.vectorSerach(recentChatHistory, companion_file_name);

        let relevantHistory = "";

        if (!!similarDocs && similarDocs.length !== 0) {
            relevantHistory = similarDocs.map((doc) => doc.pageContent).join("\n");

        }

        const { handlers } = LangChainStream()

        const model = new Replicate({
            model: "a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5",
            input: {
                max_length: 2048
            },
            apiKey: process.env.REPLICATE_API_TOKEN,
            callbackManager: CallbackManager.fromHandlers(handlers)

        })

        model.verbose = true
        const resp = String(
            await model.call(
      `
              Avoid greetings beyond the first one, and do not repeat the same sentence or message content multiple times.
   
              ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 
      
              ${companion.instructions}
      
              Below are relevant details about ${companion.name}'s past and the conversation you are in.
              ${relevantHistory}
      
    
              ${recentChatHistory}\n${companion.name}:`


            ).catch(console.error)
        );

        const cleaned = resp.replaceAll(",", "");
        const chunks = cleaned.split("\n");
        const response = chunks[0];

        await memoryManger.writeToHistory("" + response.trim(), companionKey);
        var Readable = require("stream").Readable;

        let s = new Readable();
        s.push(response);
        s.push(null);

        if (response !== undefined && response.length > 1) {
            memoryManger.writeToHistory("" + response.trim(), companionKey);

            await prismadb.companion.update({
                where: {
                    id: params.chatId
                },
                data: {
                    messages: {
                        create: {
                            content: response.trim(),
                            role: "system",
                            userId: user.id,
                        },
                    },
                }
            });
        }

        return s.toDataStreamResponse();
    } catch (error) {
        console.log("[CHAT_POST]", error);
        return new NextResponse("internal Error", { status: 500 });
    }
}