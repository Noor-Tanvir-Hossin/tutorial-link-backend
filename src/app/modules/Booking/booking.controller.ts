import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/cathchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const user = req.user;
  const result = await bookingService.createBooking(bookingData, user!);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking successful! Please wait for the tutor's approval.",
    data: result,
  });
});

const getBookingByTutorId = catchAsync(async (req, res) => {
  // const {id: tutorId} = req.params;console.log(req.user);
  const { tutorId } = req.params;
  console.log(tutorId);
  const result = await bookingService.getBookingByTutorId(tutorId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking get Success',
    data: result,
  });
});
const getBookingByStudentId = catchAsync(async (req, res) => {
 
  const { studentId } = req.params;

  const result = await bookingService.getBookingByStudentId(studentId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking get Success',
    data: result,
  });
});
const updateBookingStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await bookingService.updateBookingStatus(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking staus udpated',
    data: result,
  });
});
export const bookingController = {
  createBooking,
  getBookingByTutorId,
  updateBookingStatus,
  getBookingByStudentId,
};
