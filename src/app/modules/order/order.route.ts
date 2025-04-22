import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();



router.post("/", auth(USER_ROLE.tutor,USER_ROLE.student,USER_ROLE.admin), orderController.creatrOrder);
router.get('/verify', auth(USER_ROLE.tutor,USER_ROLE.student,USER_ROLE.admin), orderController.verifyPayment)

// Route to get all orders
router.get("/", orderController.getOrders);

router.get('/:orderId', orderController.getSingleOrder)


router.get('/student/:email', orderController.getOrdersForStudentByEmail);
router.get('/tutor/:email', orderController.getOrdersForTutorByEmail);


router.delete('/:id', auth(USER_ROLE.tutor,USER_ROLE.student,USER_ROLE.admin), orderController.deleteOrder)
router.patch('/:id/status', auth(USER_ROLE.tutor,USER_ROLE.student,USER_ROLE.admin), orderController.updateOrderStatus);



export const orderRoutes = router;