import { Request, Response } from "express";
import { bookValidationSchema } from "./book.validation";
import { bookService } from "./book.service";
import catchAsync from "../../utils/cathchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createBook = catchAsync(async(req, res) => {
  const payload = req.body
  const result = await bookService.createBook(payload)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
})

const getAllBooks = catchAsync(async (req, res) => {
  const result = await bookService.getAllBooksFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result,
  });
});

const getSingleBook= catchAsync(async(req,res) =>{

  const {id}= req.params
  const result = await bookService.getSingleBookfromDB(id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
})

const updateBook = catchAsync(async (req, res) => {
  const{id}= req.params
  const payload = req.body;

  const result = await bookService.updateBookIntoDB(id,payload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async(req,res) =>{

  const {id}= req.params
  const result = await bookService.deleteBookFromDB(id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book deleted successfully',
    data: {},
  });
})

export const bookController = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
    
}
