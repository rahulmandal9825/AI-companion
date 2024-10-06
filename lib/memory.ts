// import { Redis } from "@upstash/redis";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { Pinecone } from "@pinecone-database/pinecone";
// import { PineconeStore } from "@langchain/pinecone";
// export type CompanionKey = {
//     companionName: string;
//     modelName: string ;
//     userId: string;

// }

// export class MemoryManager {
//     private static instance:MemoryManager
//     private history: Redis
//     private vectorDBClient: Pinecone

//     public constructor(){
//         this.history = Redis.fromEnv();
//         this.vectorDBClient = new Pinecone({
//             apiKey: process.env.PINECONE_API_KEY
//         });
//     }

//     public async vectorSerach(
//         recentChatHistory: string,
//         companionFileName: string
//     ){
//         const Pinecone = <Pinecone>this.vectorDBClient;
//         const pineconeIndex = Pinecone.Index(
//             process.env.PINECONE_INDEX! || ""
//         ) 

//         const vectorStore = await PineconeStore.fromExistingIndex(
//             new OpenAIEmbeddings({openAIApiKey: process.env.OPENAI_API_KEY}),
//             {pineconeIndex}
//         )


//         const similarDocs = await vectorStore.similaritySearch(recentChatHistory, 3, {fileName: companionFileName})
//         .catch((err)=>{
//             console.log("Failed to get vector search result", err)
//         });

//         return similarDocs;


//     }



    
// }