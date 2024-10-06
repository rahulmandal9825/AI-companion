
import prismadb from '@/lib/prismadb';
import { auth, redirectToSignIn } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import ChatClient from './components/ChatClient';

interface ChatIdPageProps {
    params:{
        chatId: string;
    }
}

const ChatIdpage = async ({params}: ChatIdPageProps) => {
    const { userId } = auth()

    if(!userId){
        return redirectToSignIn();
    }

    const companion = await prismadb.companion.findUnique({
        where:{
            id:params.chatId
        },
        include:{
            messages:{
                orderBy:{
                    createdAt: "asc"
                },
                where:{
                    userId,
                }
            }
        }
    })
    if (!companion) {
        return redirect("/");
    }

  return(

 <ChatClient companion={companion} />

  )
}

export default ChatIdpage;