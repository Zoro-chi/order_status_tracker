import { Router } from "express";

import { getOrders } from "../controllers/orderController";

const router = Router();

router.get("/", getOrders);

module.exports = router;
