import express from 'express';
import { orderController } from './order.controller';
const router = express.Router();

// router.post("/", bookController.createBook);
// router.get("/", bookController.getAllBooks);
// router.get("/:productId", bookController.getSingleBook);
// router.put("/:productId", bookController.updateBook);
// router.delete("/:productId", bookController.deleteBook);

router.post("/", orderController.creatrOrder);
router.get("/revenue", orderController.calculateRevenue);

export const orderRoutes = router;