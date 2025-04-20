import { Review } from './review.model';
import { Tutor } from '../tutor/tutor.model';
import { User } from '../user/user.model';
import {Types,} from 'mongoose';

export const createReviewIntoDb = async (data: any) => {
  const review = await Review.create(data);

  // Step 2: Calculate average rating for that tutor
  
  
  const result = await Review.aggregate([
    { $match: { tutor: new Types.ObjectId(data.tutor) } },
    { $group: { _id: '$tutor', averageRating: { $avg: '$rating' } } },
  ]);

  const averageRating = result[0]?.averageRating || 0;

  // Step 3: Update tutor model with new average rating
  await Tutor.findByIdAndUpdate(data.tutor, {
    ratings: parseFloat(averageRating.toFixed(1)),
  });

  return review;
};

export const getTutorReviewsFromDb = async (tutorId: string) => {
  return await Review.find({ tutor: tutorId })
    .populate('student', 'name')
    .sort({ createdAt: -1 });
};

export const getTutorAverageRatingFromDb = async (tutorId: string) => {
  const result = await Review.aggregate([
    { $match: { tutor: new Types.ObjectId(tutorId) } },
    { $group: { _id: '$tutor', averageRating: { $avg: '$rating' } } },
  ]);

  await Tutor.findByIdAndUpdate(tutorId, {
    ratings: result, // optional: round to 1 decimal
  });

  return result[0]?.averageRating || 0;
};

export const reviewService = {
  createReviewIntoDb,
  getTutorReviewsFromDb,
  getTutorAverageRatingFromDb,
};
