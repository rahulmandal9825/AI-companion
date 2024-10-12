import LoginForm from '@/components/auth/login-form'
import { cn } from '@/lib/utils'
import { Rowdies } from 'next/font/google'
import Image from 'next/image'
import React from 'react'




const font = Rowdies({
  subsets:["latin"],
  weight:['400']
})

const LoginPage = () => {
  return (
   <div className='flex justify-between w-full h-full' >
    <div className='bg-black/40 flex-1  flex flex-col max-md:hidden '>
      <h1 className={cn('text-[70px] px-10 pt-10' , 
        font.className
      )}>
        Login
      </h1>
      <h1 className={cn('text-[70px] px-10' , 
        font.className
      )}>
         AI Comapanion
      </h1>
      <div className=' w-full flex justify-center pt-10'>
        <Image 
      src="/albert.avif"
      width={300}
      height={300}
      className='rounded-xl '
      alt='login ai  photo'
      />
      </div>
      
    </div>
    <div className='flex-1 items-center flex justify-center '>
 <LoginForm/>
    </div>
   
   </div>

    
  )
}

export default LoginPage
