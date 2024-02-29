import { RedisCache } from "@langchain/community/caches/ioredis";
import { Redis } from "ioredis";
import { config } from "../../../configs";

// See https://github.com/redis/ioredis for connection options
const client = new Redis({
  port: +config.REDIS_PORT,
  host: config.REDIS_HOST,
  username: config.REDIS_USERNAME,
  password: config.REDIS_PASSWORD,
  db: +config.REDIS_DB,
});

const cache = new RedisCache(client);

export default cache;
