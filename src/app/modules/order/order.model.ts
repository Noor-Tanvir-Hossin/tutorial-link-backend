import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      // email: { type: String, required: true },
      // product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      // quantity: { type: Number, required: true, min: 1 },

      products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      totalPrice: { type: Number, required: true, min: 0 },
      totalRevenue : {
        type: Number,
    },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
        default: "Pending",
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
    { timestamps: true }
  );
  
  export const Order = mongoose.model<TOrder>("Order", orderSchema);
  