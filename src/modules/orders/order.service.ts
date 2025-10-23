import { orderRepository } from "./order.repository";
import { CreateOrderDTO, UpdateOrderDTO } from "./order.dto";
import { orderEvents, ORDER_EVENTS } from "./order.events";

export const orderService = {
  async createOrder(data: CreateOrderDTO) {
    const order = await orderRepository.create(data);
    orderEvents.emit(ORDER_EVENTS.CREATED, order);
    return order;
  },

  async getAllOrders() {
    return orderRepository.findAll();
  },

  async getOrderById(id: string) {
    return orderRepository.findById(id);
  },

  async updateOrder(id: string, data: UpdateOrderDTO) {
    const updated = await orderRepository.update(id, data);
    orderEvents.emit(ORDER_EVENTS.UPDATED, updated);
    return updated;
  },

  async deleteOrder(id: string) {
    return orderRepository.delete(id);
  }
};
