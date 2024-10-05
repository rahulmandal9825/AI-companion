import { Companion, Message } from '@prisma/client'
import React from 'react'
import ChatHeader from './chatheader'


interface ChatClientprops {
    companion: Companion & {
        messages: Message []
    }
}
const ChatClient = ({companion}: ChatClientprops) => {
  return (
    <div className='flex flex-col  h-full p-4 space-y-2 '>
        <ChatHeader companion={companion} />
    </div>
  )
}

export default ChatClient