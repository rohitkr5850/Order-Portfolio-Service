// tests/setupTestEnv.ts
import { PrismaClient } from "@prisma/client";
import { beforeEach } from "node:test";
import { afterAll, beforeAll } from "vitest";

export const prisma = new PrismaClient();

// Reset database between test suites
beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await prisma.$connect();
});

beforeEach(async () => {
  // Clear tables between tests (adjust to your schema)
  await prisma.fill.deleteMany();
  await prisma.order.deleteMany();
  await prisma.portfolio.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
