import { Request, Response } from 'express'
import { reviewService } from './review.service'
import catchAsync from '../../utils/cathchAsync'
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

 const createReview = catchAsync (async (req: Request, res: Response) => {
  const data = req.body
  const result = await reviewService.createReviewIntoDb(data)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'review created successfully',
    data: result,
  });
})

 const getReviews = catchAsync (async (req: Request, res: Response) => {
  const { tutorId } = req.params
  const result = await reviewService.getTutorReviewsFromDb(tutorId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reviews are retrieved successfully',
    data: result,
  });
})
 const getAvarageReview = catchAsync (async (req: Request, res: Response) => {
  const { tutorId } = req.params
  const result = await reviewService.getTutorAverageRatingFromDb(tutorId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review is retrieved successfully',
    data: result,
  });
})

export const reviewController={
    createReview,
    getReviews,
    getAvarageReview
}