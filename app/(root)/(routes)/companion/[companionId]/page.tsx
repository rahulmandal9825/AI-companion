
import prismadb from '@/lib/prismadb';
import React from 'react'
import CompanionFrom from './components/CompanionFrom';
import { auth, redirectToSignIn } from '@clerk/nextjs/server';


interface CompanionPageProps{
    params:{
        companionId:string;
    }
}
const CompanionCreateEdit = async({
    params
}: CompanionPageProps) => {

  const {userId} = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  const companion = await prismadb.companion.findUnique({
    where:{
      id: params.companionId,
      userId,
    }
  })

  const categories = await prismadb.category.findMany()





   
  return (
    <CompanionFrom
      initialData = {companion}
      categories={categories}
      />
  )
}

export default CompanionCreateEdit
