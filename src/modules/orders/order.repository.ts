import { prisma } from "../../core/db/prismaClient";
import { CreateOrderDTO, UpdateOrderDTO } from "./order.dto";

export const orderRepository = {
  async create(data: CreateOrderDTO) {
    return prisma.order.create({ data });
  },

  async findAll() {
    return prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  },

  async findById(id: string) {
    return prisma.order.findUnique({ where: { id } });
  },

  async update(id: string, data: UpdateOrderDTO) {
    return prisma.order.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.order.delete({ where: { id } });
  }
};
