import { PrismaClient } from "@prisma/client";
import { logger } from "../logging/logger";

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"]
});

prisma.$connect()
  .then(() => logger.info("✅ Connected to PostgreSQL via Prisma"))
  .catch((err) => {
    logger.error("❌ Database connection failed", err);
    process.exit(1);
  });
