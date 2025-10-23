import { Request, Response, NextFunction } from "express";
import { AppError } from "../../core/errors/AppError";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err instanceof AppError ? err.statusCode : 500;

  res.status(status).json({
    code: err instanceof AppError ? err.code : "INTERNAL_ERROR",
    message: err.message || "Internal Server Error",
    details: err instanceof AppError ? err.details : undefined,
  });
}
