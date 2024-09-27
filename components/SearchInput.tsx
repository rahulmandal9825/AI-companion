"use client";
import { Search } from 'lucide-react'
import qs from 'query-string'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'

const SearchInput = () => {
    const router = useRouter()
    const SearchParams = useSearchParams()

    const categoryId = SearchParams.get("categoryId")
    const name = SearchParams.get("name")

    const [value, setValue] = useState(name || "");
    const debouncedValue = useDebounce<string>(value, 500);

    const onChange:ChangeEventHandler<HTMLInputElement> = (e)=>{
        setValue(e.target.value);
    }
    useEffect(() => {
      const query={
        name:debouncedValue,
        categoryId: categoryId,
      }
      const url = qs.stringifyUrl({
        url: window.location.href,
        query
      },
    { skipEmptyString: true, skipNull: true});

    router.push(url);

    }, [debouncedValue, router, categoryId]);
    
  return (
    <div className='relative'>
        <Search className=' absolute h-4 w-4 top-3 left-4 text-muted-foreground'/>
        <Input  placeholder='Serach..'
        onChange={onChange}
        value={value}
        className='pl-10 bg-primary/10' />
    </div>
  )
}

export default SearchInput
