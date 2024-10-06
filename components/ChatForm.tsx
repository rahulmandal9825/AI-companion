"use client";
import React, { ChangeEvent, FormEvent } from 'react'
import { ChatRequestOptions } from "ai";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendHorizonal } from 'lucide-react';

interface ChatFormPops {
    input: string,
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: {e: FormEvent<HTMLFormElement> , chatRequestOptions?: ChatRequestOptions | undefined}
    isLoading: boolean
}

const ChatForm = ({
input,
handleInputChange,
onSubmit,
isLoading
}: ChatFormPops) => {
  return (
    <form onSubmit={onSubmit}
    className=' border-t border-primary/10 py-4 flex items-center gap-x-2'
    >
      <Input 
      disabled={isLoading}
      value={input}
      onChange={handleInputChange}
      placeholder='Type a message'
      className=' rounded-lg bg-primary/10'
      />
      <Button variant="ghost"  disabled={isLoading}>
        <SendHorizonal className='h-4 w-4' />
      </Button>


    </form>
  )
}

export default ChatForm
