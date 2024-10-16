
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React from 'react'
import { BeatLoader } from "react-spinners";
import UserAvatar from './BotAvataruser';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import BotAvatar from './BotAvatar';

export interface ChatMessagePorps{
role: "system" | "user";
content?: string;
isLoading?:boolean;
src?:string 
}

const ChatMessage = ({
  role,
  content,
  isLoading,
  src
}:ChatMessagePorps) => { 

  const {toast} = useToast()
  const {theme} = useTheme()

  const onCopy =() =>{
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content)
    toast({
      description: 'Message copied to clipboard'
    })


  }
  return (
    <div className={cn(" group flex items-start gap-x-3 py-4 w-full",
      role == "user" && " justify-end"
    )}>
      {role !=="user" && src && <BotAvatar src={src} />}
      <div className=' rounded-md px-4 py-2 max-w-sm text-base font-medium bg-primary/10'>
      {isLoading ? (<BeatLoader size={4} color={theme === "light" ? "black": "white"}/>) : (content)}

      </div>
      {role === "user" && <UserAvatar/>}
      {role !== "user" && !isLoading && (
        <Button 
        onClick={onCopy}
        className=' opacity-0 group-hover:opacity-100 transition'
        size="icon"
        variant="ghost"
        >
          <Copy className='w-4 h-4 '/>
        </Button>
      )}
    </div>
  )
}

export default ChatMessage
