import { Schema, model } from "mongoose"
import { ITutor } from "./tutor.interface"

const availabilitySchema = new Schema({
  day: {
    type: String,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true,
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});


const tutorSchema = new Schema<ITutor>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    hourlyRate: { type: Number },
    totalEarnings: { type: Number,default:0 },
    availability: [availabilitySchema],
    ratings: { type: Number, default: 0 },
    location:{type: String, required:true}
  })
  
  export const Tutor = model<ITutor>('Tutor', tutorSchema)