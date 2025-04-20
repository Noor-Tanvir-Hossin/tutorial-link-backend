import { z } from 'zod';

export const createBookingZodSchema = z.object({
  body: z.object({
    student: z.string({ required_error: 'Student ID is required' }),
    tutor: z.string({ required_error: 'Tutor ID is required' }),
    // subject: z.string({ required_error: 'Subject is required' }),
    sessionDate: z.string({ required_error: 'Session date is required' }),
    notes: z.string().optional(),
  }),
});

export const updateBookingStatusZodSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'confirmed', 'rejected'], {
      required_error: 'Booking status is required',
    }),
  }),
});
