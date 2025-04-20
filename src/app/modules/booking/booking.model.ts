
import { Schema, model } from 'mongoose';
import { IBooking, BookingStatus } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tutor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // subject: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   trim: true,
    // },
    selectedHours: {
      type: Number,
      required: true,
    },
    selectedMonths: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    sessionDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected'],
      default: 'pending',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = model<IBooking>('Booking', bookingSchema);
