import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/cathchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';
import { Tutor } from '../tutor/tutor.model';
import AppError from '../../error/AppError';
import { IBooking } from './booking.interface';

const createBooking = catchAsync(async (req, res) => {
  //   const result = await BookingService.createBookingIntoDb(req.body);
  const { tutorId, student, selectedHours, selectedMonths, sessionDate } =
    req.body;

  // Input validation
  if (!tutorId || !student || !selectedHours || !selectedMonths||!sessionDate) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Missing required fields: tutorId, studentId, selectedHours, selectedMonths');
    
  }

  // Fetch tutor hourly rate
  const tutor = await Tutor.findById(tutorId);
  if (!tutor) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tutor not found');
  }

  const totalCost = tutor.hourlyRate * selectedHours * selectedMonths;

  const bookingPayload: IBooking = {
    tutor:tutorId,
    student,
    selectedHours,
    selectedMonths,
    sessionDate,
    status: 'pending',
    totalCost,
  };

  const result = await BookingService.createBookingIntoDb(bookingPayload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const filters = req.query;
  const result = await BookingService.getAllBookingsFromDb(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingService.updateBookingStatusIntoDb(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking status updated successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  updateBookingStatus,
};
