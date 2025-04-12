import { Tuser } from '../user/user.interface';
import { User } from '../user/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../error/AppError';
import { StatusCodes } from 'http-status-codes';
// import { createToken } from "./auth.utils"

const register = async (payload: Tuser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('This user is not found !');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Wrong Password!!! Tell me who are you? 😈');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: '10d',
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_token as string,
    { expiresIn: '365d' },
  );

  // const refreshToken =  jwt.sign(jwtPayload, config.jwt_refresh_token as string,{ expiresIn: config.jwt_refresh_expires_in as string });

  return { accessToken, refreshToken, user };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
  }

  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;

  const { role, email, iat } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
  };
};

const changePasswordIntoDB = async (
  user: { email: string; role: string }, 
  payload:  { oldPassword: string; newPassword: string },
) => {
  const { email } = user;
  const userData = await User.findOne({email}).select("+password"); 

  if (!userData) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (!userData.isActive) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  }
  const isValidPassword = await bcrypt.compare(payload.oldPassword, userData.password);
  if (!isValidPassword) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid password');
  }

  const newPasswordHash = await bcrypt.hash(payload.newPassword, 10);

  await User.findByIdAndUpdate(
    userData?._id,
    {
      password: newPasswordHash,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
    { new: true },
  );
  return null;
};

export const AuthService = {
  register,
  login,
  refreshToken,
  changePasswordIntoDB
};
