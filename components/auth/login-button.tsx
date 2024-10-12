"use client";

interface LoginButtomprops {
    children: React.ReactNode;
    mode?:"model" | "redirect",
    asChild?: boolean
}


import { useRouter } from 'next/navigation';
import React from 'react'

const LoginButtom = ({
    children,
    mode ="redirect",
    asChild
}:LoginButtomprops) => {

    const router = useRouter()

    if (mode =="model"){
        return(
            <span>
                TODO: IMPLEMENT Model
            </span>
        )
    }

    const onClick = () =>{
       router.push("/auth/login");
    }
    
  return (
    <span onClick={onClick} className=' cursor-pointer'>
      {children}
    </span>
  )
}

export default LoginButtom
