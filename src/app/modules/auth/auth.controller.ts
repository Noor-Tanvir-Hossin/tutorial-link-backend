import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/cathchAsync";
import { AuthService } from "./auth.service";

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

    sendResponse(res,{
        statusCode: StatusCodes.ACCEPTED,
        success: true,
        message: "User logged in successfully",
        token: result?.token,
        data: result?.user
    })
})




export const AuthControllers = {
    register,
    login
}