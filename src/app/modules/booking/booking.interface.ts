import mongoose from "mongoose";

export type BookingStatus = 'pending' | 'confirmed' | 'rejected';

export interface IBooking {
  student: mongoose.Types.ObjectId // userId of student
  tutor: mongoose.Types.ObjectId; // userId of tutor
  // subject: mongoose.Types.ObjectId;
  sessionDate: Date;
  status: BookingStatus;
  notes?: string;
  selectedHours: number;   
  selectedMonths: number;
  totalCost:number
}

export interface IBookingFilters {
  student?: string;
  tutor?: string;
  status?: BookingStatus;
  fromDate?: string;
  toDate?: string;
}