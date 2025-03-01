import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/cathchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";
import { Tuser } from "../user/user.interface";


const creatrOrder = catchAsync(async (req, res) => {
    const user = req.user
    const payload = req.body;
  
    const result = await orderService.createOrderIntoDB(user as Tuser ,payload,req.ip!);
  
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  });


  const getOrders = catchAsync(async (req, res) => {
    const order = await orderService.getOrdersFromDB();
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  });

  const verifyPayment = catchAsync(async (req, res) => {
    const order = await orderService.verifyPayment(req.query.order_id as string);
  
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Order verified successfully",
      data: order,
    });
  });

const calculateRevenue = catchAsync(async (req, res) => {
    // const payload = req.body;
  
    const result = await orderService.calculateRevenueFromDB();
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Revenue calculated successfully",
      data: result,
    });
  });

  export const orderController = {
    creatrOrder,
    calculateRevenue,
    getOrders,
    verifyPayment
  }