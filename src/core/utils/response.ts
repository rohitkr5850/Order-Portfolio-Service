import { Response } from "express";

export const successResponse = (res: Response, data: any, status = 200) => {
  return res.status(status).json({
    success: true,
    data
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  status = 400,
  code?: string
) => {
  return res.status(status).json({
    success: false,
    message,
    code
  });
};
