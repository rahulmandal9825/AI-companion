"use client";
import { Button } from '@/components/ui/button';
import { Companion, Message } from '@prisma/client'
import { ChevronLeft, Edit, MoreHorizontal, MoreVertical, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import BotAvatar from './BotAvatar';
import { useUser } from '@clerk/nextjs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';


interface ChatHeaderProps{
    companion: Companion & {
        messages: Message[];
    }
}
const ChatHeader = ({companion}:ChatHeaderProps) => {

    const { user } = useUser();

    const router = useRouter()
    const {toast} = useToast()


    const onDelete = async() =>{
        try {
            await axios.delete(`/api/companions/${companion.id}`)
            toast({
                description:"Success "
            })
        } catch (error) {
            toast({
                description:"Something went wrong ",
                variant: "destructive"
            })
        }
    }
  return (
    <div className=' flex w-full justify-between items-center border-b border-primary/10 pb-4'>
        <div className='flex gap-x-2 items-center'>
            <Button onClick={()=>router.back()} size="icon" variant="ghost" >
                <ChevronLeft className='h-8 w-8 ' />
            </Button>
            <BotAvatar src={companion.src}/>
            <div className='flex flex-col gap-y-1'>
                <p className=' items-center font-bold'>{companion.name}</p>
                <p className=' text-xs text-muted-foreground'>Created by {companion.userName}</p>
                
            </div>
        </div>
        {user?.id === companion.userId && (
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" >
                        <MoreVertical/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' >
                    <DropdownMenuItem onClick={()=>router.push(`/companion/${companion.id}`)}>
                        <Edit className='w-4 h-4 mr-2'/>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                        <Trash className='w-4 h-4 mr-2'/>
                        Delete
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        )}
    </div>
  )
}

export default ChatHeader