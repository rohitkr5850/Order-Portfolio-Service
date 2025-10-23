// tests/integration/orders.integration.spec.ts
import request from "supertest";
import express from "express";
import ordersModule from "../../modules/orders";
import { prisma } from "../setupTestEnv";
import { expect } from "vitest";
import { describe, it } from "node:test";

const app = express();
app.use(express.json());
app.use("/api", ordersModule);

describe("Orders API", () => {
  it("should create a new order", async () => {
    const res = await request(app).post("/api/orders").send({
      userId: "u1",
      symbol: "AAPL",
      side: "BUY",
      quantity: 10,
      idempotencyKey: "int-1",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.symbol).toBe("AAPL");
  });

  it("should return same order for repeated idempotency key", async () => {
    await request(app).post("/api/orders").send({
      userId: "u1",
      symbol: "AAPL",
      side: "BUY",
      quantity: 10,
      idempotencyKey: "same",
    });

    const res2 = await request(app).post("/api/orders").send({
      userId: "u1",
      symbol: "AAPL",
      side: "BUY",
      quantity: 10,
      idempotencyKey: "same",
    });

    expect(res2.statusCode).toBe(200);
  });
});
