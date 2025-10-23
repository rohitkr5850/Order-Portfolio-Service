// tests/unit/fill.service.spec.ts
import { beforeEach, describe, it } from "node:test";
import { FillService } from "../../modules/fills/fill.service";
import { OrderService } from "../../modules/orders/order.service";
import { prisma } from "../setupTestEnv";
import { expect } from "vitest";

describe("FillService - Fill Application", () => {
  const fillService = new FillService();
  const orderService = new OrderService();

  let orderId: string;

  beforeEach(async () => {
    const order = await orderService.createOrder({
      userId: "u1",
      symbol: "TSLA",
      side: "BUY",
      quantity: 100,
      idempotencyKey: "fill-test",
    });
    orderId = order.id;
  });

  it("should update order status and average cost", async () => {
    await fillService.applyFill({ orderId, price: 110, quantity: 50 });
    await fillService.applyFill({ orderId, price: 120, quantity: 50 });

    const order = await prisma.order.findUnique({ where: { id: orderId } });

    expect(order?.status).toBe("FILLED");
    expect(order?.avgPrice).toBeCloseTo(115);
  });
});
