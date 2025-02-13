import { Book } from "./book.model";
import { TBook } from "./book.interface";
import { bookSearchableFields } from "./book.constants";
import QueryBuilder from "../../builder/queryBuilder";

const createBook = async (bookData: TBook) => {
  const result = await Book.create(bookData);
  return result
};

const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Book.find().populate('author'),query)
  .search(bookSearchableFields)

  const result= await userQuery.modelQuery
  return result;
};


const getSingleBookfromDB = async (id: string) => {
  const result= await Book.findOne({id});
  return result
};

const updateBookIntoDB = async (id: string, updateData: Partial<TBook>) => {
  const result= await Book.findOneAndUpdate ({id}, updateData, { new: true });
  return result
};

const deleteBookFromDB = async (id: string) => {
  return await Book.findOneAndDelete({id});
};

export const bookService = {
    createBook,
    getAllBooksFromDB,
    getSingleBookfromDB,
    updateBookIntoDB,
    deleteBookFromDB

}