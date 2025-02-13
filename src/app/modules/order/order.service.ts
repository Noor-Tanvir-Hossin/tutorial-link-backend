import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { Book } from "../book/book.model";

export const createOrderIntoDB = async (orderData: TOrder) => {
    const product = await Book.findById(orderData.product);
    if (!product) throw new AppError( StatusCodes.BAD_REQUEST,"Product not found" );
  
    if (product.quantity < orderData.quantity) {
      throw new AppError(StatusCodes.BAD_REQUEST,"Insufficient stock");
    }
  
    // Reduce stock quantity
    product.quantity -= orderData.quantity;
    product.inStock = product.quantity > 0;
    await product.save();
  
    const order = await Order.create(orderData);
    return order;
  };
  
  export const calculateRevenueFromDB = async () => {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);
    return {
        totalRevenue: revenue.length > 0 ? revenue[0].totalRevenue : 0, // Ensure no errors on empty DB
    }
  };
  
  export const orderService = {
    createOrderIntoDB,
    calculateRevenueFromDB
  };