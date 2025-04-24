/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Types } from 'mongoose';

export interface IAvailabilitySlot {
  day:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';
  startTime: string; // e.g., "14:00"
  endTime: string; // e.g., "16:00"
}

export interface ITutor {
  user: string
  bio: string;
  subjects: mongoose.Types.ObjectId[];
  hourlyRate: number;
  totalEarnings?: number;
  availability: IAvailabilitySlot[]; // like ['Mon 4PM-6PM']
  ratings: number;
  location: string;
  email: string;
}
