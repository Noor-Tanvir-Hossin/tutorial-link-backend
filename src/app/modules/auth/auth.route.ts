import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
// import { USER_ROLE } from "../user/user.constant";
// import auth from "../../middleware/auth";

const authRouter = Router();

authRouter.post('/register', validateRequest(UserValidation.userValidationSchema), AuthControllers.register);
authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);

authRouter.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
  );
  // authRouter.post(
  //   '/change-password',
  //   auth(USER_ROLE.user),
  //   validateRequest(AuthValidation.changePasswordValidation),
  //   AuthControllers.changePassword,
  // );



export default authRouter;