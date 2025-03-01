import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { Book } from "../book/book.model";
import { Tuser } from "../user/user.interface";
import { orderUtils } from "./order.utils";

// export const createOrderIntoDB = async (orderData: TOrder) => {
//     const product = await Book.findById(orderData.product);
//     if (!product) throw new AppError( StatusCodes.BAD_REQUEST,"Product not found" );
  
//     if (product.quantity < orderData.quantity) {
//       throw new AppError(StatusCodes.BAD_REQUEST,"Insufficient stock");
//     }
  
//     // Reduce stock quantity
//     product.quantity -= orderData.quantity;
//     product.inStock = product.quantity > 0;
//     await product.save();
  
//     const order = await Order.create(orderData);
//     return order;
//   };
// orderData: TOrder,

export const createOrderIntoDB = async (user: Tuser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string) => {
    // const product = await Book.findById(orderData.product);
    // if (!product) throw new AppError( StatusCodes.BAD_REQUEST,"Product not found" );
  
    // if (product.quantity < orderData.quantity) {
    //   throw new AppError(StatusCodes.BAD_REQUEST,"Insufficient stock");
    // }
  
    // // Reduce stock quantity
    // product.quantity -= orderData.quantity;
    // product.inStock = product.quantity > 0;
    // await product.save();
  
    // const order = await Order.create(orderData);
    
    if (!payload?.products?.length)
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, "Order is not specified");

    const products = payload.products;
    let totalPrice = 0;

    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Book.findById(item.product);
        if (product) {
          const subtotal = product ? (product.price || 0) * item.quantity : 0;
          totalPrice += subtotal;
          return item;
        }
      })
    );

    let order = await Order.create({
      user,
      products: productDetails,
      totalPrice,
    });

    const shurjopayPayload = {
      amount: totalPrice,
      order_id: order._id,
      currency: "BDT",
      customer_name: user.name,
      customer_address: 'N/A',
      customer_email: user.email,
      customer_phone:'N/A',
      customer_city: 'N/A',
      client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
      order = await order.updateOne({
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      });
    }
  
    return payment.checkout_url;
    // return order;
  };

  const getOrdersFromDB = async () => {
    const data = await Order.find();
    return data;
  };
  
  const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
  
    if (verifiedPayment.length) {
      await Order.findOneAndUpdate(
        {
          "transaction.id": order_id,
        },
        {
          "transaction.bank_status": verifiedPayment[0].bank_status,
          "transaction.sp_code": verifiedPayment[0].sp_code,
          "transaction.sp_message": verifiedPayment[0].sp_message,
          "transaction.transactionStatus": verifiedPayment[0].transaction_status,
          "transaction.method": verifiedPayment[0].method,
          "transaction.date_time": verifiedPayment[0].date_time,
          status:
            verifiedPayment[0].bank_status == "Success"
              ? "Paid"
              : verifiedPayment[0].bank_status == "Failed"
              ? "Pending"
              : verifiedPayment[0].bank_status == "Cancel"
              ? "Cancelled"
              : "",
        }
      );
    }
  
    return verifiedPayment;
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
    calculateRevenueFromDB,
    getOrdersFromDB,
  verifyPayment,
  };