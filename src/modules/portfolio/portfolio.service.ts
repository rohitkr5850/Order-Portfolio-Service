import { portfolioRepository } from "./portfolio.repository";

export const portfolioService = {
  async getPortfolioSummary() {
    const positions = await portfolioRepository.getPortfolio();
    return positions.map((p) => ({
      symbol: p.symbol,
      totalQuantity: p.quantity,
      averagePrice: p.avgPrice
    }));
  }
};
