'use server'

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail';
import { generatePasswordResetToken, generateVerificationToken } from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { ResetSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import * as z from 'zod'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if(!validatedFields.success) {
    return { error: 'Invalid email!'}
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if(!existingUser) {
    return {error: 'Email not found!'}
  }

  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return { success: 'Reset email sent'}
}