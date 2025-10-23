import crypto from "crypto";
import { prisma } from "../db/prismaClient";

/**
 * Hash a request body and headers to create a unique idempotency key.
 */
export const generateIdempotencyKey = (data: any): string => {
  const json = JSON.stringify(data);
  return crypto.createHash("sha256").update(json).digest("hex");
};

/**
 * Save response in idempotent table
 */
export const saveIdempotentResponse = async (
  key: string,
  response: any
): Promise<void> => {
  await prisma.idempotency.upsert({
    where: { key },
    update: { response: JSON.stringify(response) },
    create: { key, response: JSON.stringify(response) }
  });
};

/**
 * Retrieve stored idempotent response
 */
export const getIdempotentResponse = async (key: string) => {
  const record = await prisma.idempotency.findUnique({ where: { key } });
  return record ? JSON.parse(record.response as string) : null;
};
