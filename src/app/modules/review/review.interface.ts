import mongoose from "mongoose"

export interface IReview {
    student: mongoose.Types.ObjectId
    tutor: mongoose.Types.ObjectId
    rating: number
    comment?: string
  }