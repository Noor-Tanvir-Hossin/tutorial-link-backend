import { Schema, model } from "mongoose"
import { IReview } from "./review.interface"

const reviewSchema = new Schema<IReview>(
    {
      student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      tutor: { type: Schema.Types.ObjectId, ref: 'Tutor', required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
      comment: { type: String },
    },
    {
      timestamps: true,
    }
  )
  
  export const Review = model<IReview>('Review', reviewSchema)