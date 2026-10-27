
//input validator for both sign in and signup

import {z} from 'zod';

export const RegisterSchema = z.object({
     name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password needs a letter')
    .regex(/[0-9]/, 'Password needs a number'),
})

export type RegisterInput = z.infer<typeof RegisterSchema>