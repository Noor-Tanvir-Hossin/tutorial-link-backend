import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookingController } from './booking.controller';
import { createBookingZodSchema, updateBookingStatusZodSchema } from './booking.validation';
const router = express.Router();

router.post(
  '/',
  BookingController.createBooking
);
// validateRequest(createBookingZodSchema)
router.get('/', BookingController.getAllBookings);

router.patch(
  '/:id/status',
  validateRequest(updateBookingStatusZodSchema),
  BookingController.updateBookingStatus
);

export const BookingRoutes = router;