// modules/quotes/quotes.controller.ts
import { Router, Request, Response } from "express";
import { QuotesService } from "./quotes.service";

const router = Router();
const quotesService = new QuotesService();

router.get("/", async (_req: Request, res: Response) => {
  const quotes = await quotesService.getAllQuotes();
  res.json(quotes);
});

router.get("/:symbol", async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const quote = await quotesService.getQuote(symbol.toUpperCase());
  res.json(quote);
});

// Optional: Override quote manually
router.post("/", async (req: Request, res: Response) => {
  const { symbol, price } = req.body;
  if (!symbol || !price)
    return res.status(400).json({ error: "symbol and price required" });

  const result = await quotesService.overrideQuote(symbol.toUpperCase(), price);
  res.status(201).json(result);
});

export default router;
