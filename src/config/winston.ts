import { createLogger, format, transports } from "winston";

const { combine, timestamp, colorize, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = createLogger({
  format: combine(
    timestamp(),
    colorize({
      message: true,
      level: true,
    }),
    logFormat
  ),
  transports: [new transports.Console()],
});
