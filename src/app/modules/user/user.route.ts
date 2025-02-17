import express from 'express';
import { UserValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';
import { userController } from './user.controller';


const router = express.Router()

router.post('/create-user', validateRequest(UserValidation.userValidationSchema) ,userController.createStudent);
router.get('/', userController.getUser);
router.get('/:id', userController.getSingleUser);
router.patch('/:id', validateRequest(UserValidation.updateUserValidationSchema) ,userController.updateUser);
router.patch('/:id', validateRequest(UserValidation.updateUserValidationSchema) ,userController.blockUser);


export const UserRoutes = router;