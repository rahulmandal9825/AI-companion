
import prismadb from '@/lib/prismadb';
import React from 'react'
import CompanionFrom from './components/CompanionFrom';


interface CompanionPageProps{
    params:{
        companionId:string;
    }
}
const CompanionCreateEdit = async({
    params
}: CompanionPageProps) => {

  const companion = await prismadb.companion.findUnique({
    where:{
      id: params.companionId,
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
