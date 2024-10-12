"use client";

import React from 'react'
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button';

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password: "",
    }
  })
  return (
    <CardWrapper
    backbuttonLabel='Dont have an account?'
    headerLabel='Welcome back'
    backButtonHref='/auth/register'
    showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(()=>{})} className='space-y-6'>
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
          <Button
          type='submit'
          className='w-full'
          >

          </Button>
        </form>

      </Form>
    </CardWrapper>
  )
}

export default LoginForm
