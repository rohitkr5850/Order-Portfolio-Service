// tests/unit/order.service.spec.ts
import { expect } from "vitest";
import { OrderService } from "../../modules/orders/order.service";
import { prisma } from "../setupTestEnv";
import { describe, it } from "node:test";

describe("OrderService - Idempotency", () => {
  const service = new OrderService();

  it("should create an order once for same idempotency key", async () => {
    const orderInput = {
      userId: "user_1",
      symbol: "AAPL",
      side: "BUY",
      quantity: 10,
      idempotencyKey: "same-key",
    };

    const order1 = await service.createOrder(orderInput);
    const order2 = await service.createOrder(orderInput);

    expect(order1.id).toBe(order2.id);
    const count = await prisma.order.count();
    expect(count).toBe(1);
  });
});
