import { JwtPayload } from 'jsonwebtoken';
import { Tutor } from '../tutor/tutor.model';

import { Booking } from './booking.model';

const createBooking = async (payload: any, user: JwtPayload) => {
  const tutor = await Tutor.findOne({ user: payload.tutorId });

  if (!tutor) {
    throw new Error('User not valid');
  }
  payload.user = user._id;

  //   console.log(bookingData);
  const bookingData = await Booking.create(payload);
  return bookingData;
};

// booking get by tutor Id

const getBookingByTutorId = async (id: string) => {
  const booking = await Booking.find({ tutorId: id });

  return booking;
};
const getBookingByStudentId = async (id: string) => {
  const booking = await Booking.find({ studentId: id });
  console.log(booking);
  return booking;
};

const updateBookingStatus = async (id: string, data: { status: string }) => {
  console.log(id, data.status);
  const result = await Booking.findByIdAndUpdate(
    id,
    { status: data.status },
    { new: true },
  );
  return result;
};

export const bookingService = {
  createBooking,
  getBookingByTutorId,
  updateBookingStatus,
  getBookingByStudentId,
};
