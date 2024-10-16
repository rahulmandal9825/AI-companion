"use client";

import React, { useState } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { RegisterSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import FromError from '../form-error';
import FromSuccess from '../from-success';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

const RegisterFrom = () => {
  const [message, setMessage] = useState("");
  const [errormessage, setErrormessage] = useState("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{
      email:"",
      password: "",
      name:"",

    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setErrormessage("")
    setMessage("")
    
    try {
      await axios.post("/api/user/register",values).then((res)=>{
        console.log(res.data)
        setMessage(res.data?.success);
        setErrormessage(res.data.error)
      });

    } catch (error) {  
      console.log("login on submit", error)
    }
  }
  return (
    <CardWrapper
    backbuttonLabel='Already have an account?'
    headerLabel='Create an account'
    backButtonHref='/auth/login'
    showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
          <FormField
            control={form.control}
            name="name"
            render={({field}) =>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  className='bg-white'
                  placeholder='Rahul Mandal'
                  disabled={isLoading}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({field}) =>(
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  className='bg-white text-black'
                  disabled={isLoading}
                  placeholder='aicompanion@example.com'
                  type='email'
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
              <FormField
            control={form.control}
            name="password"
            render={({field}) =>(
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  className='bg-white'
                  disabled={isLoading}
                  placeholder='******'
                  type='password'
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />

          </div>
          <FromError message={errormessage} />
          <FromSuccess message={message}/>
          
             <Button 
             type='submit'
             disabled={isLoading}
             className='w-full bg-black text-white font-semibold hover:bg-black/90'
             >
              {isLoading ? (<BeatLoader size={6} color= "white"/>) : (
               <h1>Create an Account</h1> )}
             </Button>
  
        </form>

      </Form>
    </CardWrapper>
  )
}

export default RegisterFrom
