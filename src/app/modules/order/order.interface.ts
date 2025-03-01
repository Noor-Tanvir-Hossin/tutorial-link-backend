import mongoose from 'mongoose';

// export type TOrder = {
//     email: string;
//     product: mongoose.Types.ObjectId;
//     quantity: number;
//     totalPrice: number;
//   }
export type TOrder = {
  user: mongoose.Types.ObjectId;
  // email: string;
  products: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];

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
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  createdAt?: Date;
  updatedAt?: Date;
};
