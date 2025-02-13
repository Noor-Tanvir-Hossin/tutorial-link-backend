import { z } from "zod";

export const bookValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.enum(["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  quantity: z.number().min(0, "Quantity must be a positive number"),
  inStock: z.boolean(),
});
