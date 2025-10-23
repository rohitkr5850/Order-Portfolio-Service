import EventEmitter from "events";

export const orderEvents = new EventEmitter();

export const ORDER_EVENTS = {
  CREATED: "order.created",
  UPDATED: "order.updated"
};
