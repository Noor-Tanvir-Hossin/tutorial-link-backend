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
router.get('/email/:email', auth(USER_ROLE.user , USER_ROLE.admin),  userController.getUserByEmail)

router.patch(
    '/:id/role',
    auth(USER_ROLE.admin),
    validateRequest(UserValidation.updateUserRoleValidation),
    userController.updateUserRole
  );

router.patch(
    '/:id/status',
    auth(USER_ROLE.admin),
    validateRequest(UserValidation.updateUserStatusValidation),
    userController.updateUserStatus
  );



export const UserRoutes = router;