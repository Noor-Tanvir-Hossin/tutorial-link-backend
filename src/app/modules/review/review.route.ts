import express from 'express'

import { reviewController } from "./review.controller"

const router = express.Router()

router.post('/',  reviewController.createReview)
router.get('/:tutorId', reviewController.getReviews)
router.get('/avg/:tutorId', reviewController.getAvarageReview)

export const ReviewRoutes = router