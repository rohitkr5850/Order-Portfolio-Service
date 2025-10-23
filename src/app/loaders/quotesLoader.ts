import { QuotesService } from "../../modules/quotes/quotes.service";
import { logger } from "../../core/logging/logger";

export function loadQuotes() {
  const quotes = new QuotesService();

  // Override quotes using your overrideQuote method
  // Since overrideQuote is async, use Promise.all to seed multiple
  const initialQuotes = {
    SPY: 500.5,
    BND: 74.0,
    QQQ: 420.1,
  };

  Promise.all(
    Object.entries(initialQuotes).map(([symbol, price]) =>
      quotes.overrideQuote(symbol, price)
    )
  ).then(() => {
    logger.info("✅ Mock quotes initialized");
  });
}
