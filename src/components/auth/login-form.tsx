'use client'

import * as z from 'zod'
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { useState, useTransition } from 'react'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error') === "OAuthAccountNotLinked"
    ? "Email already in use with different provider"
    : ""

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values).then((data) => {
        //TODO: when we have 2FA 
        // setSuccess(data?.success)
        setError(data?.error)
      })
    })
  }

  return (
    <CardWrapper 
      headerLabel="Welcome back" 
      backButtonLabel={"Don't have an account?"} 
      backButtonHref={"/auth/register"}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField 
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      disabled={isPending} 
                      placeholder='john.doe@example.com' 
                      type='email'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      disabled={isPending} 
                      {...field} 
                      placeholder='*****'  
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError}/>
          <FormSuccess message={success}/>
          <Button type='submit' disabled={isPending} className='w-full'>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}