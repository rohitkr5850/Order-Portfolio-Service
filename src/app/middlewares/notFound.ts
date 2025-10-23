import { Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    code: "NOT_FOUND",
    message: `Route ${req.originalUrl} not found`,
  });
}
