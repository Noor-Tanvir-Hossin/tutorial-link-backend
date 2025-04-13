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

const getUserByEmail = catchAsync(async(req , res)=> {
  const { email } = req.params;
  const result = await userService.getUserByEmailFromDB(email);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User by email retrieved successfully",
    data: result,
  })
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

const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await userService.updateUserRoleFromDB(id, role);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User role updated successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  const result = await userService.updateUserStatusFromDB(id, isActive);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User status updated successfully",
    data: result,
  });
});




  export const userController= {
    createUser,
    getUser,
    getUserByEmail,
    getSingleUser,
    updateUser,
    updateUserRole,
    updateUserStatus,
    blockUser,

  }