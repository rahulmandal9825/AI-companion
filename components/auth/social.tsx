"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


function Social() {

  const onclick = (provider:"google" | "github") =>{
    signIn(provider, {
      callbackUrl:DEFAULT_LOGIN_REDIRECT,
    })
  }
  return (
    <div className='flex items-center w-full gap-x-2 '>
  <Button 
  size="lg" className="w-full bg-white hover:bg-white border-none drop-shadow-lg " variant="outline" onClick={()=>onclick("google")} >
    <Image 
    src="/google.png"
    width={20}
    height={20}
    alt="Google icons"
    />
  </Button>
  <Button  size="lg" className="w-full bg-white hover:bg-white border-none drop-shadow-lg " variant="outline" onClick={()=>onclick("github")} >
    <Image 
    src="/github.png"
    width={20}
    height={20}
    alt="Google icons"
    />
  </Button>
    </div>
  )
}

export default Social
