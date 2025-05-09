import express from 'express';
import { UserValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';
import { userController } from './user.controller';



const router = express.Router()

router.post('/create-admin', validateRequest(UserValidation.userValidationSchema) ,userController.createUser);
router.get('/', userController.getUser);
router.get('/:email', userController.getSingleUser);
router.patch('/:id', validateRequest(UserValidation.updateUserValidationSchema) ,userController.updateUser);
router.patch('/:id',  validateRequest(UserValidation.updateUserValidationSchema) ,userController.blockUser);
router.get('/email/:email',  userController.getUserByEmail)

router.patch(
    '/:id/role',
    validateRequest(UserValidation.updateUserRoleValidation),
    userController.updateUserRole
  );

router.patch(
    '/:id/status',
    
    validateRequest(UserValidation.updateUserStatusValidation),
    userController.updateUserStatus
  );



export const UserRoutes = router;