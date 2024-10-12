import {Companion, Message} from "@prisma/client";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import ChatMessage, { ChatMessagePorps } from "./chat-message";

interface ChatMessagesProps {
    messages: ChatMessagePorps[];
    isLoading: boolean;
    companion: Companion;
}

const ChatMessages = ({messages, isLoading, companion}: ChatMessagesProps) => {

  const [fakeLoading , setFakeLoading] = useState(messages.length === 0 ? true: false)

  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setFakeLoading(false);

    }, 1000);
 
    return () =>{
      clearTimeout(timeout);
    }
  })

  useEffect(()=>{
    scrollRef?.current?.scrollIntoView({ behavior: "smooth"})
  },[messages.length]);
  
    return (

        <div className="flex-1 overflow-y-auto pr-4">
            <ChatMessage
                isLoading= {fakeLoading}
                src={companion.src}
                role="system"
                content={`Hello , I am ${companion.name}, ${companion.description}`}
            /> 
           {messages.map((message) =>(
            <ChatMessage 
            key={message.src}
            role={message.role}
            content={message.content}
            src={companion.src}
            />
           ))}
           {isLoading && (
            <ChatMessage 
            role="system"
            src={companion.src}
            isLoading/>
           )}
           <div ref={scrollRef}/>
        </div>
    );
};

export default ChatMessages;
