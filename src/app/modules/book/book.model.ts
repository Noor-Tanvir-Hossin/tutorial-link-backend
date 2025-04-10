import { Schema, model } from "mongoose";
import { TBook } from "./book.interface";

const bookSchema = new Schema<TBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: {
      type: String,
      required: [true, "Product image is required"],
      trim: true,
    },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Book = model<TBook>("Book", bookSchema);
