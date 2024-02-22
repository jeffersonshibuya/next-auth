'use client'

import * as z from 'zod'
import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { NewPasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { useState, useTransition } from 'react'
import { login } from '@/actions/login'
import Link from 'next/link'
import { reset } from '@/actions/reset'
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/actions/new-password'

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setSuccess(data?.success)
        setError(data?.error)
      })
    })
  }

  return (
    <CardWrapper 
      headerLabel="Enter a new password" 
      backButtonLabel={"Back to login"} 
      backButtonHref={"/auth/login"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField 
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      disabled={isPending} 
                      placeholder='******' 
                      type='password'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button type='submit' disabled={isPending} className='w-full'>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}