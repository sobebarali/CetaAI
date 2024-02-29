import winston from "winston";
import { config } from "../../configs";
const { combine, timestamp, json } = winston.format;


const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log", level: "info" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exception.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "rejections.log" }),
  ],
});

export default logger;