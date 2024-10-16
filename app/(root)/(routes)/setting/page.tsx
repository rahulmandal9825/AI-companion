import { auth, signOut } from '@/auth'
import React from 'react'

const Setting =async () => {

    const session = await auth()

  return (
    <>
    
    <div>{JSON.stringify(session)}</div>
    <form action={async ()=> {
      "use server";
      await signOut()
    }}>
       <button className=' bg-white text-black p-2 rounded-lg'>Sign out</button>
    </form>
   
    </>
    
  )
}

export default Setting