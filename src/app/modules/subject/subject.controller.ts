import {subjectService } from './subject.service'
import catchAsync from '../../utils/cathchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';


 const createSubject= catchAsync (async (req, res) => {
    const result = await subjectService.createSubjectIntoDb(req.body)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'subject created successfully',
        data: result,
      });
  });
 const getAllSubjects = catchAsync (async (req, res) => {
    const result = await subjectService.getAllSubjectsFromDb()
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'subjects are retrived successfully',
        data: result,
      });
  });
 const getSingleSubject = catchAsync (async (req, res) => {
    const result = await subjectService.getSingleSubjectFromDb(req.params.id)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'subject is retrieved successfully',
        data: result,
      });
  });
 const updateSubject = catchAsync (async (req, res) => {
    const result = await subjectService.updateSubjectIntoDB(req.params.id, req.body)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'subject is updated successfully',
        data: result,
      });
  });
 const deleteSubject = catchAsync (async (req, res) => {
    const result = await subjectService.deleteSubjectFromDb(req.params.id)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'subject is deleted successfully',
        data: result,
      });
  });





  export const SubjectController = {
    createSubject,
    getAllSubjects,
    getSingleSubject,
    updateSubject,
    deleteSubject
  }