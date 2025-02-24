import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart
} from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/:id", protect, removeFromCart);

export default router;
