import { prisma } from "../../core/db/prismaClient";
import { CreateFillDTO } from "./fill.dto";

export const fillRepository = {
  async create(data: CreateFillDTO) {
    return prisma.fill.create({ data });
  },

  async findAll() {
    return prisma.fill.findMany({ orderBy: { createdAt: "desc" } });
  },

  async findById(id: string) {
    return prisma.fill.findUnique({ where: { id } });
  }
};
