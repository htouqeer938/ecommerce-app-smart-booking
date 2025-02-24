import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import User from "../models/User";
import { ErrorResponse } from "../utils/response";

export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer "))
    return ErrorResponse(res)({ message: "Not authorized", statusCode: 401 });

  try {
    const decoded: any = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return ErrorResponse(res)({ message: "Token failed", statusCode: 401 });
  }
};

export const adminOnly = (req: any, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return ErrorResponse(res)({
      message: "Admin only access",
      statusCode: 403
    });
  }
};
