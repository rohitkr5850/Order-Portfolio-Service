// modules/quotes/quotes.service.ts
import { QuotesStore } from "./quotes.store";

const mockSymbols = ["AAPL", "GOOG", "TSLA", "AMZN", "MSFT"];

export class QuotesService {
  private store = new QuotesStore(60);

  async getQuote(symbol: string) {
    const cached = this.store.get(symbol);
    if (cached) return cached;

    // Mock random price
    const price = Number((100 + Math.random() * 50).toFixed(2));
    const quote = { symbol, price, timestamp: new Date().toISOString() };

    this.store.set(symbol, quote);
    return quote;
  }

  async getAllQuotes() {
    return Promise.all(mockSymbols.map((s) => this.getQuote(s)));
  }

  async overrideQuote(symbol: string, price: number) {
    const quote = { symbol, price, timestamp: new Date().toISOString() };
    this.store.set(symbol, quote);
    return quote;
  }
}
