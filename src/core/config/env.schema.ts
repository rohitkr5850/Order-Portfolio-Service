import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.string().default("4000"),
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.string().default("info")
});

export type EnvSchema = z.infer<typeof envSchema>;
