import { Response as ExpressResponse } from "express";

interface ResponsePayload {
  message?: string;
  statusCode?: number;
  body?: any;
}

export const SuccessResponse =
  (res: ExpressResponse) =>
  ({ message = "success", statusCode = 200, body = {} }: ResponsePayload) => {
    return res.status(statusCode).json({ statusCode, message, body });
  };

export const ErrorResponse =
  (res: ExpressResponse) =>
  ({
    message = "Something went wrong",
    statusCode = 400,
    body = {}
  }: ResponsePayload) => {
    return res.status(statusCode).json({ statusCode, message, error: body });
  };
