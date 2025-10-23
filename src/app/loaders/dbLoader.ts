import { prisma } from "../../core/db/prismaClient";
import { logger } from "../../core/logging/logger";

export async function loadDB() {
  try {
    await prisma.$connect();
    logger.info("✅ Connected to PostgreSQL Database");
  } catch (err) {
    logger.error("❌ Failed to connect to database", err);
    throw err;
  }
}
