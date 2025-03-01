import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";

const authRouter = Router();

authRouter.post('/register', validateRequest(UserValidation.userValidationSchema), AuthControllers.register);
authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);

authRouter.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
  );



export default authRouter;