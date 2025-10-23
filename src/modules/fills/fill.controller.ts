import { Request, Response, NextFunction } from "express";
import { fillService } from "./fill.service";
import { successResponse } from "../../core/utils/response";

export const fillController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await fillService.applyFill(req.body);
      return successResponse(res, result, 201);
    } catch (err) {
      next(err);
    }
  },

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await fillService.getAllFills();
      return successResponse(res, result);
    } catch (err) {
      next(err);
    }
  }
};
