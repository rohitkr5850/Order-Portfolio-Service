import { Request, Response, NextFunction } from "express";
import { orderService } from "./order.service";
import { successResponse } from "../../core/utils/response";

export const orderController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.createOrder(req.body);
      return successResponse(res, result, 201);
    } catch (err) {
      next(err);
    }
  },

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.getAllOrders();
      return successResponse(res, result);
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.getOrderById(req.params.id);
      return successResponse(res, result);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.updateOrder(req.params.id, req.body);
      return successResponse(res, result);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.deleteOrder(req.params.id);
      return successResponse(res, result);
    } catch (err) {
      next(err);
    }
  }
};
