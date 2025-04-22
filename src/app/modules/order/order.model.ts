import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tutor: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor', 
      required: true, 
    },
    selectedMonths: {
      type: Number,
      required: true,
      min: 1, // At least 1 month
    },
    selectedHours: {
      type: Number,
      required: true,
      min: 1, // At least 1 hour
    },

    totalPrice: { type: Number, min: 0 },
    totalRevenue: { type: Number,min:0 },
    totalHours: { type: Number,min:0 },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model<TOrder>('Order', orderSchema);
