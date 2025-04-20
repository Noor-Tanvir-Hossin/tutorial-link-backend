import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tutor: {
      type: Schema.Types.ObjectId,
      ref: 'Tutor', // Now referencing the Tutor model, as tutor is the service
      required: true, // The tutor providing the service
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

    totalPrice: { type: Number, required: true, min: 0 },
    totalRevenue: { type: Number },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
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
