// tests/integration/fills.integration.spec.ts
import request from "supertest";
import express from "express";
import fillsModule from "../../modules/fills";
import ordersModule from "../../modules/orders";
import portfolioModule from "../../modules/Portfolio";
import { describe, it } from "node:test";
import { expect } from "vitest";

const app = express();
app.use(express.json());
app.use("/api", ordersModule);
app.use("/api", fillsModule);
app.use("/api", portfolioModule);

describe("Fills + Portfolio Integration", () => {
  let orderId: string;

  it("should apply fills and update portfolio", async () => {
    const orderRes = await request(app).post("/api/orders").send({
      userId: "u2",
      symbol: "TSLA",
      side: "BUY",
      quantity: 100,
      idempotencyKey: "int-fill",
    });

    orderId = orderRes.body.id;

    await request(app).post("/api/fills").send({ orderId, price: 100, quantity: 50 });
    await request(app).post("/api/fills").send({ orderId, price: 110, quantity: 50 });

    const portfolioRes = await request(app).get("/api/portfolio/u2");
    expect(portfolioRes.statusCode).toBe(200);
    expect(portfolioRes.body.totalValue).toBeDefined();
  });
});
