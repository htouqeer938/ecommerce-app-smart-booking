import { Response } from "express";
import Cart from "../models/Cart";
import cleanData from "../utils/cleanData";
import { SuccessResponse } from "../utils/response";

export const getCart = async (req: any, res: Response) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "products.productId"
  );
  return SuccessResponse(res)({
    message: "Cart fetched",
    body: { cart: cleanData({ data: cart }) }
  });
};

export const addToCart = async (req: any, res: Response) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { $push: { products: req.body } },
    { new: true, upsert: true }
  );
  return SuccessResponse(res)({
    message: "Product added to cart",
    body: { cart: cleanData({ data: cart }) }
  });
};

export const removeFromCart = async (req: any, res: Response) => {
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user._id },
    { $pull: { products: { productId: req.params.id } } },
    { new: true }
  );
  return SuccessResponse(res)({ message: "Product removed from cart" });
};
