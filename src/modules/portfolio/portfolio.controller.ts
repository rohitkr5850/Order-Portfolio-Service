import { Request, Response, NextFunction } from "express";
import { portfolioService } from "./portfolio.service";
import { successResponse } from "../../core/utils/response";

export const portfolioController = {
  async getSummary(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await portfolioService.getPortfolioSummary();
      return successResponse(res, result);
    } catch (err) {
      next(err);
    }
  }
};
