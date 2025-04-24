import express from "express"
import validateRequest from "../../middleware/validateRequest"
import { BookingValidationSchema } from "./booking.validation"
import { bookingController } from "./booking.controller"
import auth from "../../middleware/auth"
const router = express()


router.post("/", auth("student"), validateRequest(BookingValidationSchema), bookingController.createBooking )
router.get("/:tutorId", auth("tutor"),  bookingController.getBookingByTutorId )
router.get("/st/:studentId", auth("student"),  bookingController.getBookingByStudentId )
router.patch("/:id", auth("tutor" , "student"),  bookingController.updateBookingStatus )


export  const bookingRoute = router