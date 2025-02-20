import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { userService } from "./user.service";
import catchAsync from "../../utils/cathchAsync";

const createUser = catchAsync(async (req, res) => {
    const payload = req.body;
  
    const result = await userService.createStudentIntoDB(payload);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User is created succesfully',
      data: result,
    });
  });

const getUser= catchAsync(async(req,res) =>{

  const result = await userService.getUserFromDB()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users is retreived succesfully',
    data: result,
  });
})
const getSingleUser= catchAsync(async(req,res) =>{

  const {id}= req.params
  const result = await userService.getSingleUserFromDB(id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is retreived succesfully',
    data: result,
  });
})

const blockUser = catchAsync(async (req, res) => {
  const{id}= req.params
  const payload = req.body;

  const result = await userService.updateUserIntoDB(id,payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is updated succesfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const{id}= req.params
  const payload = req.body;

  const result = await userService.updateUserIntoDB(id,payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is updated succesfully',
    data: result,
  });
});



  export const userController= {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    blockUser
  }