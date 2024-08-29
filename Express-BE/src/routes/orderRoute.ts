import { Router } from "express";

import {
	getOrders,
	changeOrderStatus,
	createOrder,
} from "../controllers/orderController";

const router = Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.patch("/:id/status", changeOrderStatus);

module.exports = router;
