import { fillRepository } from "./fill.repository";
import { orderRepository } from "../orders/order.repository";
import { fillEvents, FILL_EVENTS } from "./fill.events";
import { CreateFillDTO } from "./fill.dto";

export const fillService = {
  async applyFill(data: CreateFillDTO) {
    const fill = await fillRepository.create(data);
    await orderRepository.update(data.orderId, { status: "FILLED" });
    fillEvents.emit(FILL_EVENTS.APPLIED, fill);
    return fill;
  },

  async getAllFills() {
    return fillRepository.findAll();
  }
};
