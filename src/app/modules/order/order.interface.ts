
import mongoose from 'mongoose';

export type TOrder = {
  student: mongoose.Types.ObjectId;
  tutor: mongoose.Types.ObjectId;
  bookingId: string;
  
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  totalPrice: number;
  totalRevenue: number;
  totalHours:number;
  selectedMonths: number;  
  selectedHours: number
  status: "Pending" | "Paid" | "Cancelled";
  createdAt?: Date;
  updatedAt?: Date;
};
