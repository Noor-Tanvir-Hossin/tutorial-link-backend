import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/cathchAsync";
import { AuthService } from "./auth.service";
import config from "../../config";
import { Tuser } from "../user/user.interface";

const register = catchAsync(async(req, res)=>{
    const result = await AuthService.register(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User created succesfully',
        data: result,
      });
})

const login = catchAsync(async(req, res)=>{
    const result = await AuthService.login(req.body);

    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
    });

    sendResponse(res,{
        statusCode: StatusCodes.ACCEPTED,
        success: true,
        message: "User logged in successfully",
        token: result?.accessToken,
        data: result?.user
    })
})

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Access token is retrieved succesfully!',
      data: result,
    });
  });

const changePassword = catchAsync(async(req ,res)=>{

    const user = req.user as Tuser;
   
    const result = await AuthService.changePasswordIntoDB(user , req.body)
    sendResponse(res , {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Password Updated successfully',
      data : result,
    })
  })



export const AuthControllers = {
    register,
    login,
    refreshToken,
    changePassword
}