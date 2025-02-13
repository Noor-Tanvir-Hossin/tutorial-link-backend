import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/cathchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";


const creatrOrder = catchAsync(async (req, res) => {
    const payload = req.body;
  
    const result = await orderService.createOrderIntoDB(payload);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Order created successfully",
      data: result,
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
    calculateRevenue
  }