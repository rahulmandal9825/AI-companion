"use client";

import { Companion, Message } from '@prisma/client'
import React, { FormEvent, useState } from 'react'
import ChatHeader from './chatheader'
import { useRouter } from 'next/navigation'
import { useCompletion } from "ai/react";
import ChatForm from '@/components/ChatForm';
import ChatMessages from '@/components/chat-messages';
import { ChatMessagePorps } from '@/components/chat-message';



interface ChatClientprops {
    companion: Companion & {
        messages: Message []
    }
}
const ChatClient = ({companion}: ChatClientprops) => {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessagePorps[]>(companion.messages);

  const {
    input ,
    isLoading,
    handleInputChange,
    handleSubmit,
    setInput
  } = useCompletion({
    api:`/api/chat/${companion.id}`,
    onFinish(prompt, completion) {

        const systemMessage: ChatMessagePorps = {
          role: "system",
          content: completion,
        }

        setMessages((current) => [...current, systemMessage ])
        setInput("");
        
        router.refresh();

    },
  })


  const onSubmit = (e: FormEvent<HTMLFormElement>) =>{
    const userMessage: ChatMessagePorps = {
      role: "user",
      content: input,
    }

    setMessages((current)=> [...current, userMessage]);

    handleSubmit(e);
  }


  return (
    <div className='flex flex-col h-full p-4 space-y-2 '>
        <ChatHeader companion={companion} />
        <ChatMessages companion={companion}
        isLoading={isLoading}
        messages={messages}
        />
        <ChatForm
          isLoading={isLoading}
          input={input}
          handleInputChange={handleInputChange}
          onSubmit={onSubmit}
        />
    </div>
  )
}

export default ChatClient