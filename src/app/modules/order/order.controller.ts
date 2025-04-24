import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/cathchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.service';
import { JwtPayload } from 'jsonwebtoken';


const creatrOrder = catchAsync(async (req, res) => {
  const user = req.user;

  const payload = req.body;

  const result = await orderService.createOrderIntoDB(
    user as JwtPayload,
    payload,
    req.ip!,
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await orderService.getOrdersFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking retrieved successfully',
    data: order,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  const order = await orderService.getSingleOrderFromDB(orderId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Booking retrieved successfully',
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking verified successfully',
    data: order,
  });
});

const getOrdersForStudentByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const orders = await orderService.getOrdersByStudentEmailFromDb(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking fetched for student',
    data: orders,
  });
});
export const getOrdersForTutorByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const orders = await orderService.getOrdersByTutorEmailFromDb(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking fetched for tutor',
    data: orders,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderService.deleteOrderFromDB(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderService.updateOrderStatusFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking status updated successfully',
    data: result,
  });
});

export const orderController = {
  creatrOrder,
  getSingleOrder,
  getOrders,
  verifyPayment,
  getOrdersForStudentByEmail,
  getOrdersForTutorByEmail,
  deleteOrder,
  updateOrderStatus,
};
