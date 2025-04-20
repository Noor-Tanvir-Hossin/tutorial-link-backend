import { z } from 'zod'

export const createSubjectZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    gradeLevel: z.string(),
    category: z.string(),
  }),
})
