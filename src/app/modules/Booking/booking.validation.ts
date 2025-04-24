import { z } from 'zod';

export const BookingValidationSchema = z.object({
  body: z.object({
    tutorId: z.string().min(1),
    studentId: z.string().min(1),
    subject: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
    day: z.string().min(1),
    timeSlot: z.object({
      startTime: z.string().min(1),
      endTime: z.string().min(1),
    }),
    status: z.enum(["confirmed", "pending", "cancelled"]).optional(),
  }),
});

// TypeScript type generate korte chaile:
