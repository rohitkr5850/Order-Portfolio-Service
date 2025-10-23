import { prisma } from "../../core/db/prismaClient";

export const portfolioRepository = {
  async getPortfolio() {
    return prisma.position.findMany({
      select: { symbol: true, quantity: true, avgPrice: true }
    });
  }
};
