import { Schema, model } from 'mongoose';
import { ITutor } from './tutor.interface';

// Sub-schema for availability
const availabilitySchema = new Schema(
  {
    day: {
      type: String,
      enum: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      required: true,
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { _id: false },
);

// Main Tutor schema
const tutorSchema = new Schema<ITutor>(
  {
    user: { type: String, required: true },
    name:{type:String},
    bio: { type: String },
    image: { type: String },
    email: { type: String, required: true },
    subjects: [{ type: String }], // plain strings like "Math", "English"
    hourlyRate: { type: Number, required: true },
    totalEarnings: { type: Number, default: 0 },
    availability: [availabilitySchema],
    ratings: { type: Number, default: 0 },
    location: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Tutor = model<ITutor>('Tutor', tutorSchema);
