import express from "express";
import { getAdminOrders } from "../controllers/order.controller";
import { adminOnly, protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/orders", protect, adminOnly, getAdminOrders);

export default router;
