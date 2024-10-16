"use client";

import React, { useState } from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import FromError from '../form-error';
import FromSuccess from '../from-success';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const LoginForm = () => {
  const searchparams = useSearchParams();
  const urlError = searchparams.get('error') === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";
  const [message, setMessage] = useState("");
  const [errormessage, setErrormessage] = useState("")

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password: "",
    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setErrormessage("")
    setMessage("")

    try {
  
        await axios.post("/api/user/login",values).then((res)=>{
        console.log(res.data , "login alert message")
        setMessage(res.data.success);
        setErrormessage(res.data.error)
      });
    } catch (error) {
      
      console.log("login on submit", error)
    }
  }
  return (
    <CardWrapper
    backbuttonLabel='Dont have an account?'
    headerLabel='Welcome back'
    backButtonHref='/auth/register'
    showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
            control={form.control}
            name="email"
            render={({field}) =>(
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                  {...field}
                  className='bg-white'
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
                  placeholder='******'
                  type='password'
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />

          </div>
          <FromError message={errormessage || urlError} />
          <FromSuccess message={message}/>
          
             <Button 
             type='submit'
             disabled={isLoading}
             className='w-full bg-black text-white font-semibold hover:bg-black/90'
             >
              {isLoading ? (<BeatLoader size={6} color= "white"/>) : (
               <h1>Login</h1> )}
             </Button>
  
        </form>

      </Form>
    </CardWrapper>
  )
}

export default LoginForm
