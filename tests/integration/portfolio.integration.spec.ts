// tests/integration/portfolio.integration.spec.ts
import request from "supertest";
import express from "express";
import portfolioModule from "../../modules/portfolio";
import { expect } from "vitest";
import { describe, it } from "node:test";

const app = express();
app.use(express.json());
app.use("/api", portfolioModule);

describe("Portfolio API", () => {
  it("should return 404 for non-existing user", async () => {
    const res = await request(app).get("/api/portfolio/unknown");
    expect(res.statusCode).toBe(404);
  });
});
