

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


// const notFound  : RequestHandler = (req, res, next: NextFunction) => {
//   return res.status(StatusCodes.NOT_FOUND).json({
//     success: false,
//     message: 'API Not Found !!',
//     error: '',
//   });
// };


const notFound: RequestHandler = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !!',
    error: '',
  });
};


export default notFound;