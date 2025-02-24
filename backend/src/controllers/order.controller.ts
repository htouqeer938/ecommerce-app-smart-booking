import { Response } from "express";
import Order from "../models/Order";
import cleanData from "../utils/cleanData";
import { SuccessResponse } from "../utils/response";

export const getAdminOrders = async (req: Request, res: Response) => {
  const orders = await Order.find().populate(["products.productId", "userId"]);
  return SuccessResponse(res)({
    message: "Orders fetched",
    body: { orders: cleanData({ data: orders }) }
  });
};

export const getOrders = async (req: any, res: Response) => {
  const orders = await Order.find({ userId: req.user._id }).populate([
    "products.productId",
    "userId"
  ]);
  return SuccessResponse(res)({
    message: "Orders fetched",
    body: { orders: cleanData({ data: orders }) }
  });
};

export const createOrder = async (req: any, res: Response) => {
  const order = await Order.create({ userId: req.user._id, ...req.body });
  return SuccessResponse(res)({
    message: "Order created",
    body: { order: cleanData({ data: order }) }
  });
};
