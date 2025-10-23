export interface CreateOrderDTO {
    symbol: string;
    quantity: number;
    price: number;
    side: "BUY" | "SELL";
  }
  
  export interface UpdateOrderDTO {
    status?: "PENDING" | "FILLED" | "CANCELLED";
  }
  