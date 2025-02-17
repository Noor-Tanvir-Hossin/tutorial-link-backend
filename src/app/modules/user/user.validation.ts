import { z } from 'zod';

const userValidationSchema = z.object({
   body: z.object({
    name: z.string({
        required_error: "Name must be provided and must be a string",
    }).min(3).max(50),

    email: z.string({
        required_error: "Email must be provided and must be a string",
    }).email(),

    password: z
    .string({
      required_error: 'Password is required for your safety',
    })
    .max(20, { message: 'Password can not be more than 20 characters' }),

    
   })
})

const updateUserValidationSchema = z.object({
    body: z.object({
      name: z
        .string({
          required_error: "Name must be provided and must be a string",
        })
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name can not be more than 50 characters" })
        .optional(),
  
      email: z
        .string({
          required_error: "Email must be provided and must be a string",
        })
        .email({ message: "Invalid email format" })
        .optional(),
  
      password: z
        .string({
          required_error: "Password is required for your safety",
        })
        .max(20, { message: "Password can not be more than 20 characters" })
        .optional(),
    }),
  });

export const UserValidation = {
    userValidationSchema,
    updateUserValidationSchema
}

/* name: string – The full name of the user.
email: string – The email address of the user, used for authentication and communication.
password: string – The password for the user, securely stored.
role: "admin" | "user" – The role of the user, determining their access level. Default is "user".
isBlocked: boolean – A flag indicating whether the user is blocked or not. Default is false.
createdAt: Date – The timestamp when the user was created.
updatedAt: Date – The timestamp of the last update to the user. */