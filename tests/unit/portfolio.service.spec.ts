// tests/unit/portfolio.service.spec.ts
import { expect } from "vitest";
import { PortfolioService } from "../../modules/portfolio/portfolio.service";
import { prisma } from "../setupTestEnv";
import { beforeEach, describe, it } from "node:test";

describe("PortfolioService - PnL Calculation", () => {
  const service = new PortfolioService();

  beforeEach(async () => {
    await prisma.portfolio.create({
      data: {
        userId: "u1",
        totalValue: 10000,
        positions: { AAPL: 5, TSLA: 2 },
      } as any,
    });
  });

  it("should correctly calculate total value and PnL", async () => {
    const result = await service.calculatePnL("u1", {
      AAPL: 210,
      TSLA: 500,
    });

    expect(result.totalValue).toBeGreaterThan(1000);
    expect(result.pnl).toBeDefined();
  });
});
