
//input validator for both sign in and signup

import {email, z} from 'zod';
import { ROLES } from '../enum/Role';

export const RegisterSchema = z.object({
     name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email(),
  role: z.enum(ROLES),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password needs a letter')
    .regex(/[0-9]/, 'Password needs a number'),
})


export type RegisterInput = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
  email:z.string().trim().min(2).max(80),
  password:z
  .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password needs a letter')
    .regex(/[0-9]/, 'Password needs a number'),

})

export type LoginInput = z.infer<typeof LoginSchema>