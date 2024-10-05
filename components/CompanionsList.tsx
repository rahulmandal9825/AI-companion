import { Companion } from '@prisma/client'
import Image from 'next/image';
import React from 'react'
import { Card, CardFooter, CardHeader } from './ui/card';
import Link from 'next/link';

interface CompanionsListProps{
    data: Companion[];
}

const Companions = ({data}:CompanionsListProps) => {

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-3" >
               <div className=' relative w-[440px] h-[440px]'>
                <Image 
                fill 
                className=" grayscale"
                alt="empty"
                src="/empty.png"
                />
                </div>
                <p>No Companion Found.</p> 
            </div>
        )
    }
  return (
    <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10 '>
      {data.map((item) => (
        <Card 
        key={item.id}
        className=' bg-primary/10 rounded-xl  cursor-pointer hover:opacity-75 transition border-0  '

        >
        <Link  href={`/chat/${item.id}`} >
        <CardHeader className=' flex items-center justify-center text-center text-muted-foreground'>
            <div className=' relative w-32 h-32'>
            <Image 
                fill 
                className=" rounded-xl object-cover"
                alt="Comapnion"
                src={item.src}
                /> 
            </div>
            <p className=' font-bold'>
                {item.name}
            </p>
            <p className=' text-xs'>

                {item.description}
            </p>
        </CardHeader>
        <CardFooter  className=' flex items-center justify-between text-xs text-muted-foreground'>
            <p className=' lowercase'>
                @{item.userName}
            </p>

        </CardFooter>
        </Link>

        </Card>
      ))}
    </div>
  )
}

export default Companions
