

import {z} from 'zod'


export const CreateProductSchema = z.object({
  name: z.string().min(2),
    category: z.string(),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
});