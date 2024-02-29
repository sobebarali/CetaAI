import morgan from "morgan";
import logger from "../../services/logger";

const morganMiddleware = morgan(
  process.env.NODE_ENV === "production" ? "combined" : "dev",
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);

export default morganMiddleware;