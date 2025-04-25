import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const BookingSchema = new Schema<IBooking>(
  {
    tutorId: { type: String, required: true },
    studentId: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: String, required: true }, // Example: "2025-04-18"
    day: { type: String, required: true }, // Example: "Saturday"
    timeSlot: {
      startTime: { type: String, required: true }, // Example: "02:56"
      endTime: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled' ,'accepted' , 'rejected','Paid', "Failed"],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Booking = model('Booking', BookingSchema);
