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

  const {productId}= req.params
  const result = await bookService.getSingleBookfromDB(productId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
})

const updateBook = catchAsync(async (req, res) => {
  const { productId } = req.params;
    // Extract product data from the request body
    const productInfo = req.body;
    // Update the product in the database based on the provided ID and data
    const result = await bookService.updateBookIntoDB(
      productId,
      productInfo
    );


  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async(req,res) =>{

  const {productId}= req.params
  // console.log(productId);
  
  const result = await bookService.deleteBookFromDB(productId)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
})

export const bookController = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
    
}
