"use client";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@clerk/nextjs';
import React from 'react'



const UserAvatar = () => {
  const {user} = useUser()
  
  return (
    <Avatar className='h-12 w-12 ' >
        <AvatarImage src={user?.imageUrl}/>
    </Avatar>
  )
}

export default UserAvatar