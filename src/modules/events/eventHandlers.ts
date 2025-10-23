// modules/events/eventHandlers.ts
import { eventBus } from "./eventBus";

export const registerEventHandlers = () => {
  eventBus.subscribe("order.created", (data) => {
    console.log("🟢 Order Created:", data);
  });

  eventBus.subscribe("fill.applied", (data) => {
    console.log("🟡 Fill Applied:", data);
  });

  eventBus.subscribe("portfolio.updated", (data) => {
    console.log("🔵 Portfolio Updated:", data);
  });

  eventBus.subscribe("quote.updated", (data) => {
    console.log("🟣 Quote Updated:", data);
  });
};
