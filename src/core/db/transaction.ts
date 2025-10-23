import { prisma } from "./prismaClient";

/**
 * Executes a callback function within a database transaction.
 * Rolls back automatically on error.
 */
export const transaction = async <T>(
  fn: (tx: typeof prisma) => Promise<T>
): Promise<T> => {
  return await prisma.$transaction(async (tx) => {
    return await fn(tx);
  });
};
