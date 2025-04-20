import e, { Request, Response } from 'express'
import { tutorService } from './tutor.service'
import catchAsync from '../../utils/cathchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';


const createTutorProfile = catchAsync(async (req, res) => {
    const payload = req.body;
  
    const result = await tutorService.createTutorProfileIntoDb(payload);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Tutor Profile created succesfully',
      data: result,
    });
  });
const getAllTutor = catchAsync(async (req, res) => {
    const result = await tutorService.getAllTutorFromDB(req.query)
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Tutors retreived  succesfully',
      data: result,
    });
  });
const getSingleTutor = catchAsync(async (req, res) => {
    const userId = req.params.id
  const result = await tutorService.getSingleTutorFromDb(userId)
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Tutor retreived  succesfully',
      data: result,
    });
  });

  const updateTutor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await tutorService.updateTutorIntoDb(id, payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Tutor updated successfully',
      data: result,
    });
  });
  
  const deleteTutor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await tutorService.deleteTutorFromDb(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Tutor deleted successfully',
      data: result,
    });
  });
  




export const tutorControlller = {
    createTutorProfile,
    getAllTutor,
    getSingleTutor,
    updateTutor,
    deleteTutor
  }
