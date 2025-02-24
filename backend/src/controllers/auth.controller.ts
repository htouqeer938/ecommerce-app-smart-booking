import { Request, Response } from "express";
import User from "../models/User";
import cleanData from "../utils/cleanData";
import { generateToken } from "../utils/jwt";
import { ErrorResponse, SuccessResponse } from "../utils/response";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return ErrorResponse(res)({ message: "User already exists" });

  const user = await User.create({ name, email, password, role });
  return SuccessResponse(res)({
    message: "User created successfully",
    body: { token: generateToken(user._id as string) }
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return SuccessResponse(res)({
      message: "User login successful",
      body: {
        user: cleanData({ data: user }),
        token: generateToken(user._id as string)
      }
    });
  } else {
    return ErrorResponse(res)({
      message: "Invalid email or password",
      statusCode: 401
    });
  }
};

export const getProfile = async (req: any, res: Response) => {
  return SuccessResponse(res)({
    message: "Profile fetched",
    body: { user: cleanData({ data: req.user }) }
  });
};
