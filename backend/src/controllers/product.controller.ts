import { Request, Response } from "express";
import Product from "../models/Product";
import cleanData from "../utils/cleanData";
import { ErrorResponse, SuccessResponse } from "../utils/response";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  return SuccessResponse(res)({
    message: "Products fetched",
    body: { products: cleanData({ data: products }) }
  });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  return SuccessResponse(res)({
    message: "Products created",
    body: { product: cleanData({ data: product }) }
  });
};

export const updateStock = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return ErrorResponse(res)({
      message: "Product not found",
      statusCode: 404
    });

  product.stock = req.body.stock;
  await product.save();
  return SuccessResponse(res)({
    message: "Products updated",
    body: { product: cleanData({ data: product }) }
  });
};
