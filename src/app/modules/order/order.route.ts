import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

// router.post("/", bookController.createBook);
// router.get("/", bookController.getAllBooks);
// router.get("/:productId", bookController.getSingleBook);
// router.put("/:productId", bookController.updateBook);
// router.delete("/:productId", bookController.deleteBook);

router.post("/", auth(USER_ROLE.user), orderController.creatrOrder);
router.get("/revenue", orderController.calculateRevenue);
router.get("/",auth(USER_ROLE.user), orderController.getOrders);

export const orderRoutes = router;