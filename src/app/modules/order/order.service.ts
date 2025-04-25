import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { Order } from './order.model';
// import { Book } from '../book/book.model';

import { orderUtils } from './order.utils';
import { Tutor } from '../tutor/tutor.model';
import { TOrder } from './order.interface';
import { JwtPayload } from 'jsonwebtoken';
import { Booking } from '../Booking/booking.model';

export const createOrderIntoDB = async (
  user: JwtPayload,
  payload: TOrder,
  client_ip: string,
) => {
 
  const tutors = await Tutor.findOne({ user: payload?.tutor });
  // console.log(tutors?.availability.length)

  const daysInAWeek = tutors?.availability.length;
  if (!tutors) {
    throw new Error('Tutor not found');
  }

  const { selectedMonths, selectedHours, student, tutor, bookingId } = payload;

  if (!tutor || !student || !selectedHours || !selectedMonths) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Missing required fields: tutorId, studentId, selectedHours, selectedMonths',
    );
  }

  const totalHours = selectedHours * 4 * selectedMonths * daysInAWeek!;

  // calculating total prices for the student
  const totalPrices = tutors.hourlyRate * totalHours;

  let order = await Order.create({
    bookingId,
    student,
    tutor,
    totalPrice: totalPrices,
    totalHours,
    selectedMonths,
    selectedHours,
  });

  const shurjopayPayload = {
    amount: totalPrices,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: 'N/A',
    customer_email: user.email,
    customer_phone: 'N/A',
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
  const data = await Order.find().populate('student').populate('tutor');
  return data;
};

const getSingleOrderFromDB = async (orderId: string) => {
  const data = await Order.findById(orderId)
    .populate('student')
    .populate('tutor');

  return data;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }
  if(verifiedPayment.length){
    const order =await Order.findOne({ 'transaction.id': order_id,})
    console.log(order);
    if(order?.status){
      await Booking.findByIdAndUpdate(order?.bookingId, {status: order?.status})
    }
  }
  // console.log(verifiedPayment);
  return verifiedPayment;
};

const deleteOrderFromDB = async (id: string) => {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error('Order not found');
  }
  const result = await Order.findByIdAndDelete(id);
  return result;
};

const updateOrderStatusFromDB = async (orderId: string) => {
  // Find the order by ID
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  // Calculate total revenue for the tutor (could be the same as the total price or include fees)
  const totalRevenue = order.totalPrice;

  // Update the tutor's earnings (This could be added to a 'tutorEarnings' field in the tutor model)
  const tutor = await Tutor.findById(order.tutor); // Assuming order refers to a tutor
  if (tutor) {
    tutor.totalEarnings! += totalRevenue; // Increment tutor earnings by the total amount
    await tutor.save();
  }

  // Update the order to mark it as paid
  order.status = 'Paid';
  await order.save();

  return order;
};

const getOrdersByStudentEmailFromDb = async (email: string) => {
  const orders = await Order.find()
    .populate({
      path: 'student',
      match: { email },
    })
    .populate('tutor') // Optionally populate tutor too
    .exec();

  // Filter out nulls (populate didn't match)
  const filteredOrders = orders.filter((order) => order.student !== null);

  return filteredOrders;
};

export const getOrdersByTutorEmailFromDb = async (email: string) => {
  const orders = await Order.find()
    .populate({
      path: 'tutor',
      match: { email },
    })
    .populate('student') // Optionally populate student too
    .exec();

  // Filter out nulls
  const filteredOrders = orders.filter((order) => order.tutor !== null);
  

  return filteredOrders;
};



export const orderService = {
  createOrderIntoDB,
  getOrdersFromDB,
  verifyPayment,
  deleteOrderFromDB,
  updateOrderStatusFromDB,
  getOrdersByStudentEmailFromDb,
  getSingleOrderFromDB,
  getOrdersByTutorEmailFromDb,
};
