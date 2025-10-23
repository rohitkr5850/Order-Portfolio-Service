import { z } from "zod";

export const createFillSchema = z.object({
  orderId: z.string().uuid(),
  quantity: z.number().positive(),
  price: z.number().positive()
});
