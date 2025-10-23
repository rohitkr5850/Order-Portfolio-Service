import { z } from "zod";

export const createOrderSchema = z.object({
  symbol: z.string().min(1),
  quantity: z.number().positive(),
  price: z.number().positive(),
  side: z.enum(["BUY", "SELL"])
});

export const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "FILLED", "CANCELLED"])
});
