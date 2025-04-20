import mongoose, { Schema } from 'mongoose'
import { ISubject } from './subject.interface'

const subjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true, unique: true },
    gradeLevel: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
)

export const SubjectModel = mongoose.model<ISubject>('Subject', subjectSchema)
