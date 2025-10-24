import { ERROR_CODES } from "./errorCodes";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown; // ✅ ADD THIS

  constructor(
    message: string,
    statusCode = 500,
    code = ERROR_CODES.SERVER_ERROR,
    isOperational = true,
    details?: unknown // ✅ ADD THIS
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details; // ✅ ADD THIS

    Error.captureStackTrace(this);
  }
}
