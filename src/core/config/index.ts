import dotenv from "dotenv";
import { envSchema } from "./env.schema";
import { logger } from "../logging/logger";

dotenv.config();

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error("❌ Invalid environment configuration:", parsed.error.format());
  process.exit(1);
}

export const config = parsed.data;
