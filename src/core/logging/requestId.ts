import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to attach a unique request ID to each incoming request
 */
export const attachRequestId = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  req.headers["x-request-id"] = req.headers["x-request-id"] || randomUUID();
  next();
};
