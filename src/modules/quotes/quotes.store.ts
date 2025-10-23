// modules/quotes/quotes.store.ts
export class QuotesStore {
    private cache: Map<string, { value: any; expiresAt: number }> = new Map();
    private ttl: number;
  
    constructor(ttlSeconds: number = 60) {
      this.ttl = ttlSeconds * 1000;
    }
  
    set(symbol: string, value: any) {
      const expiresAt = Date.now() + this.ttl;
      this.cache.set(symbol, { value, expiresAt });
    }
  
    get(symbol: string) {
      const entry = this.cache.get(symbol);
      if (!entry) return null;
      if (Date.now() > entry.expiresAt) {
        this.cache.delete(symbol);
        return null;
      }
      return entry.value;
    }
  
    clear() {
      this.cache.clear();
    }
  }
  