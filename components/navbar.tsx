"use client";

import { Sparkle } from 'lucide-react'
import Link from 'next/link'
import {Poppins} from "next/font/google"
import React from 'react'


import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import MobileSidebar from './MobileSidebar';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import LoginButtom from './auth/login-button';

const font = Poppins({
  weight: "600",
  subsets: ["latin"]
});

const Navbar = () => {
  return (        
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16'>
      <div className='flex items-center'>
      <MobileSidebar/>
      <Link href="/" >
      <h1 className={cn('hidden md:block text-xl md:text-3xl font-bold text-primary ',
        font.className
      )}>
        companion.ai
        </h1></Link>

      </div>
      <div className='flex  items-center gap-x-3 '>
        <Button size="lg"  variant="premium">
          Upgrade
          <Sparkle className='h-4 w-4  fill-white text-white ml-2'/>
        </Button>
        <ModeToggle/>
        <LoginButtom>
          <Button size="lg"variant="premium">
          Sign-in
        </Button>
        </LoginButtom>
        

{/* <SignedOut>
                <div className=" hover:opacity-75 bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 text-white border-0 font-medium hover:text-white hover:bg-black/10 text-md p-2 rounded-lg">
                    <SignInButton />
                </div>
            </SignedOut>

            <SignedIn>
                <div  className=" my-10 bg-orange-1 p-3 rounded-l-xl flex gap-3 font-bold ">
                    <UserButton  />
                </div>
            </SignedIn> */}
      </div>
    </div>
  )
}

export default Navbar
