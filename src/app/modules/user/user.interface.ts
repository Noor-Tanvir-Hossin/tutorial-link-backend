import { Schema, model } from 'mongoose';
import { Tuser } from './user.interface';

const userSchema = new Schema<Tuser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ['student', 'tutor'], required: true },
    passwordChangeAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<Tuser>('user', userSchema);
