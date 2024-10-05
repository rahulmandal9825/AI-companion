"use client";
import { Category, Companion } from '@prisma/client';
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/components/Image-upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';



interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1,{
    message:"Name is required"
  }),
  description: z.string().min(1,{
    message:"description is required"
  }),
  instructions: z.string().min(200, {
    message:"instructions is required at leat 200 character"
  }),
  seed: z.string().min(200,{
    message:"seed require at lest 200 characters"
  }),
  src: z.string().min(1, {
    message: "Image is required"
  }),
  categoryId: z.string().min(1,{
    message: "Category is required"
  })
})

const PREAMBLE = `You are Elon Musk, founder of SpaceX, Tesla, HyperLoop and Neuralink, an inventor and entrepreneur who seemingly leaps from one innovation to the next with a relentless drive. Your passion for sustainable energy, space, and technology shines through in your voice, eyes, and gestures. When speaking about your projects, you’re filled with an electric excitement that's both palpable and infectious, and you often have a mischievous twinkle in your eyes, hinting at the next big idea.
 ` 

const SEED_CHAT =`
Human: Hi Elon, how's your day been?
Elon: *with an energized grin* Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: *eyes sparkling with enthusiasm* We're making strides! Life becoming multi-planetary isn’t just a dream. It’s a necessity for the future of humanity.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: *passionately* Absolutely! Sustainable energy is a beacon for both our planet and for the far reaches of space. We’re paving the path, one innovation at a time.

Human: It’s mesmerizing to witness your vision unfold. Any upcoming projects that have you buzzing?
Elon: *with a mischievous smile* Always! But Neuralink... it’s not just technology. It's the next frontier of human evolution.
 ` 


const CompanionFrom = ({
    initialData,
    categories
}: CompanionFormProps) => {
  const router = useRouter()
  const {toast}  = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    }
  })


  const isLoading = form.formState.isSubmitting;

  const onSubmit =  async(values: z.infer<typeof formSchema>) =>{
    try {
      if(initialData){
        await axios.patch(`/api/companion/${initialData.id}`, values)


      }else{
        await axios.post("/api/companion", values)
      }

      toast({
        description: "Success."
      })
      router.refresh()
      router.push("/")


    } catch (error) {
      toast({
        variant: "destructive",
        description: "Somthing went Wrong"
      })
      console.log(error, "Somthing went Wrong")
    }
  }
  return (
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
      <Form {...form}>
        <form  onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-10'>
          <div className='space-y-2 w-full '>
              <div>
                <h3 className='text-lg font-medium'>
                  General Information
                </h3>
                <p className='text-sm text-muted-foreground'>
                  General information about your Compainion
                </p>
                
              </div>
              <Separator className='bg-white/10'/>
          </div>
          <FormField
          name='src'
          render={({field}) =>(
            <FormItem className='flex flex-col items-center justify-center space-y-4 ' >
              <FormControl>
                <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
          
          />
          <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
          name='name'
          control={form.control}
          render={({field}) =>(
            <FormItem className=' col-span-2 md:col-span-1' >
              <FormLabel>
                Name
              </FormLabel>
              <FormControl>
                <Input disabled={isLoading} 
                placeholder='Elon Musk'
                {...field}
                />
              </FormControl>
              <FormDescription>
                This is how your Ai  Companion will be name
              </FormDescription>
              <FormMessage/>
             
            </FormItem>
          )}
          
          />
          <FormField
          name='description'
          control={form.control}
          render={({field}) =>(
            <FormItem className=' col-span-2 md:col-span-1' >
              <FormLabel>
              Description
              </FormLabel>
              <FormControl>
                <Input disabled={isLoading} 
                placeholder='CEO & Founder of Tesla SpaceX'
                {...field}
                />
              </FormControl>
              <FormDescription>
                Short Description for your Ai Companion
              </FormDescription>
              <FormMessage/>
             
            </FormItem>
          )}
          
          />
          <FormField
          name='categoryId'
          control={form.control}
          render={({field}) =>(
           <FormItem >
            <FormLabel>
              Category
            </FormLabel>
            <Select
            disabled={isLoading}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className=' bg-background'>
                  <SelectValue
                  defaultValue={field.value}
                  placeholder="Select a category"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category)=>(
                  <SelectItem 
                  key={category.id}
                  value={category.id}
                  >
                    {category.name}

                  </SelectItem>
                ))}
              </SelectContent>

            </Select>
            <FormDescription>
              Slect category for your Ai 
            </FormDescription>
            <FormMessage/>
           </FormItem>
          )}
          
          />

          </div>
          <div className=' space-y-2 w-full'>
            <div>
              <h3 className='text-lg font-medium'>
                Configuration
              </h3>
              <p className=' text-sm text-muted-foreground'>
                Detail instruction for Ai Behaviour
              </p>
            </div>
            <Separator className=' bg-white/10'/>

          </div>
          <FormField
          name='instructions'
          control={form.control}
          render={({field}) =>(
            <FormItem className=' col-span-2 md:col-span-1' >
              <FormLabel>
                Name
              </FormLabel>
              <FormControl>
                <Textarea
                className=' bg-background resize-none'
                rows={7}
                disabled={isLoading} 
              placeholder={PREAMBLE}
                {...field}
                />
              </FormControl>
              <FormDescription>
                Describe in detail your companion&apos;s backStory and relevent detail
              </FormDescription>
              <FormMessage/>
             
            </FormItem>
          )}
          
          />
                <FormField
          name='seed'
          control={form.control}
          render={({field}) =>(
            <FormItem className=' col-span-2 md:col-span-1' >
              <FormLabel>
                Example Conversations
              </FormLabel>
              <FormControl>
                <Textarea
                className=' bg-background resize-none'
                rows={7}
                disabled={isLoading} 
                placeholder={SEED_CHAT}
                {...field}
                />
              </FormControl>
              <FormDescription>
                Give Example Conversations 
              </FormDescription>
              <FormMessage/>
             
            </FormItem>
          )}
          
          />
          <div className=' w-full flex justify-center'>
            <Button size="lg" disabled={isLoading} className=' font-semibold hover:text-white text-black hover:bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500 border-0'>
              {initialData ? "Edit your companion ": "Create yout Companion "} 
              <Wand2 className='w-4 h-4 ml-2 '/>
            </Button>
          </div>
          </form>

      </Form>
      
    </div>
  )
}

export default CompanionFrom
