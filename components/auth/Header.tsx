import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import React from 'react'

const font = Poppins({
    subsets:["latin"],
    weight:['600']
})

interface Headerpops{
    label: string,
}
const Header = ({label}:Headerpops) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
        <h1 className={cn(
            "text-3xl font-semibold",
            font.className
        )}> AI Comapanion 🔐</h1>
        <p className=' text-muted-foreground'>
            {label}
        </p>
        </div>
  )
}

export default Header