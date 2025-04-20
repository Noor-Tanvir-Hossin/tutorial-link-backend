import express from 'express'
import auth from "../../middleware/auth"
import { USER_ROLE } from "../user/user.constant"
import { reviewController } from "./review.controller"

const router = express.Router()

router.post('/',  reviewController.createReview)
router.get('/:tutorId', reviewController.getReviews)
router.get('/avg/:tutorId', reviewController.getAvarageReview)

export const ReviewRoutes = router