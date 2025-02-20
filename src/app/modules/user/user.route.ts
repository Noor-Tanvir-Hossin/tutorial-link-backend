import express from 'express';
import { UserValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';
import { userController } from './user.controller';
import { USER_ROLE } from './user.constant';
import auth from '../../middleware/auth';


const router = express.Router()

router.post('/create-admin', auth(USER_ROLE.admin), validateRequest(UserValidation.userValidationSchema) ,userController.createUser);
router.get('/', auth(USER_ROLE.admin, USER_ROLE.user), userController.getUser);
router.get('/:id', userController.getSingleUser);
router.patch('/:id', validateRequest(UserValidation.updateUserValidationSchema) ,userController.updateUser);
router.patch('/:id',  validateRequest(UserValidation.updateUserValidationSchema) ,userController.blockUser);


export const UserRoutes = router;