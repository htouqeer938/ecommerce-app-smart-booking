import express from "express";
import {
  createProduct,
  getProducts,
  updateStock
} from "../controllers/product.controller";
import { adminOnly, protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, adminOnly, createProduct);
router.put("/:id/stock", protect, adminOnly, updateStock);

export default router;
