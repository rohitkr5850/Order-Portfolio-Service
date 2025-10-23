import pino from "pino";

export function loadLogger(level: string) {
  const logger = pino({
    level,
    transport:
      process.env.NODE_ENV === "development"
        ? { target: "pino-pretty", options: { colorize: true } }
        : undefined,
  });

  return logger;
}
