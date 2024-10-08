import { Redis } from "@upstash/redis";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { TaskType } from "@google/generative-ai";

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
export type CompanionKey = {
    companionName: string;
    modelName: string ;
    userId: string;

}

export class MemoryManager {
    private static instance:MemoryManager
    private history: Redis
    private vectorDBClient: Pinecone

    public constructor(){
        this.history = Redis.fromEnv();
        this.vectorDBClient = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY
        });
    }

    public async vectorSerach(
        recentChatHistory: string,
        companionFileName: string
    ){
        const Pinecone = <Pinecone>this.vectorDBClient;
        const pineconeIndex = Pinecone.Index(
            process.env.PINECONE_INDEX! || ""
        ) 

        const embeddings = new GoogleGenerativeAIEmbeddings({
            model: "embedding-001", // Specify the model to use
            taskType: TaskType.RETRIEVAL_DOCUMENT,
            title: "Document title", // Optional: Add a title if needed
            apiKey: process.env.GOOGLE_API_KEY // Use your Google API key
          });


        const vectorStore = await PineconeStore.fromExistingIndex(
            embeddings,
            {pineconeIndex}
        )


        const similarDocs = await vectorStore.similaritySearch(recentChatHistory, 3, {fileName: companionFileName})
        .catch((err)=>{
            console.log("Failed to get vector search result", err)
        });

        return similarDocs;


    }

    public static async getInstance():Promise<MemoryManager> {
        if(!MemoryManager.instance){
            MemoryManager.instance = new MemoryManager()
        }

        return MemoryManager.instance;
    }

    private generateRedisCompanionKey(companionKey: CompanionKey): string {
        return `${companionKey.companionName}-${companionKey.modelName}-${companionKey.userId}`
    }

    public async writeToHistory(text: string, companionKey: CompanionKey){
        if (!companionKey || typeof companionKey.userId == "undefined"){
            console.log("companion key set incorrectly");
            return "";
        }
        const key = this.generateRedisCompanionKey(companionKey);
        const result = await this.history.zadd(key, {
            score: Date.now(),
            member: text,
        })

        return result
    }

    public async readLatestHistory(companionKey: CompanionKey): Promise<string>{
        if (!companionKey || typeof companionKey.userId =="undefined"){
            console.log("companion key set incorrectly")
            return ""        }
        
            const key = this.generateRedisCompanionKey(companionKey);
            let result = await this.history.zrange(key, 0, Date.now(), {
                byScore: true,
            })
            result = result.slice(-30).reverse()
            const recentChats = result.reverse().join("\n");
            return recentChats


    }

    public async seedChatHistory(
        seedContent: string,
        delimiter: string = "\n",
        companionKey: CompanionKey
    ){
        const key = this.generateRedisCompanionKey(companionKey);
        if (await this.history.exists(key)) {
            console.log("User already has chat history")
            return;
        }
        const content = seedContent.split(delimiter);
        let counter = 0;
        for (const line of content){
            await this.history.zadd(key, {score: counter, member: line})
            counter += 1;
        }
    }






    
}