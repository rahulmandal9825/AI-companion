import Categories from '@/components/Categories';
import Companions from '@/components/CompanionsList';
import SearchInput from '@/components/SearchInput'
import prismadb from '@/lib/prismadb'
import React from 'react'

interface RootpageProps {
  searchParams: {
    categoryId: string;
    name:string;
  }
}

const RootPage = async ({searchParams}:RootpageProps
) => {

  const data = await prismadb.companion.findMany({
    where:{
      categoryId: searchParams.categoryId,
      name:{
        search: searchParams.name
      }
    },
    orderBy:{
      createdAt: "desc"
    },
  })
  const categories = await prismadb.category.findMany();



  return (
    <div className='h-full p-4 space-y-2'>
      <SearchInput/>
      <Categories data={categories}/>
      <Companions data= {data}/>
      
    </div>
  )
}

export default RootPage
