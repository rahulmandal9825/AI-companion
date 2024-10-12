"use client";

import Image from "next/image";
import { Button } from "../ui/button";


function Social() {
  return (
    <div className='flex items-center w-full gap-x-2 '>
  <Button  size="lg" className="w-full bg-white hover:bg-white border-none drop-shadow-lg " variant="outline" onClick={()=>{}} >
    <Image 
    src="/google.png"
    width={20}
    height={20}
    alt="Google icons"
    />
  </Button>
  <Button  size="lg" className="w-full bg-white hover:bg-white border-none drop-shadow-lg " variant="outline" onClick={()=>{}} >
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
