// modules/events/event.types.ts
export type AppEvent =
  | "order.created"
  | "fill.applied"
  | "portfolio.updated"
  | "quote.updated";

export interface OrderCreatedPayload {
  orderId: string;
  userId: string;
  symbol: string;
  quantity: number;
}

export interface FillAppliedPayload {
  fillId: string;
  orderId: string;
  price: number;
}

export interface PortfolioUpdatedPayload {
  userId: string;
  totalValue: number;
}

export interface QuoteUpdatedPayload {
  symbol: string;
  price: number;
}
