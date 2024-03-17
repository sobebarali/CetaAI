import dotenv from "dotenv";
dotenv.config();

let config = {
  PORT: process.env.PORT || 8080,
  LOG_LEVEL: process.env.LOG_LEVEL || "http",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_USERNAME: process.env.REDIS_USERNAME || "default",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "my-top-secret",
  REDIS_DB: process.env.REDIS_DB || 0,
  NODE_ENV: process.env.NODE_ENV || "development",
  PROD_CORS_ORIGIN: process.env.PROD_CORS_ORIGIN || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  MODEL_NAME: process.env.MODEL_NAME || "gpt-3.5-turbo-instruct",
  QDRANT_URL: process.env.QQDRANT_URL || "http://localhost:6333",
  QDRANT_API_KEY: process.env.QDRANT_API_KEY || "",
  QDRANT_INDEX_NAME: process.env.QDRANT_INDEX_NAME || "default",
  LLAMAINDEX_API_KEY: process.env.LLAMAINDEX_API_KEY || "",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_S3_PDF_BUCKET: process.env.AWS_S3_PDF_BUCKET || "",
  AWS_S3_PDF_REGION: process.env.AWS_S3_PDF_REGION || "ap-south-1",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/ceta-ai",
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || "",
  SUPER_TOKENS_CONNECTOR_URL: process.env.SUPER_TOKENS_CONNECTOR_URL || "",
  SUPER_TOKENS_API_KEY: process.env.SUPER_TOKENS_API_KEY || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || "",
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || "",
  APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID || "",
  APPLE_KEY_ID: process.env.APPLE_KEY_ID || "",
  APPLE_TEAM_ID: process.env.APPLE_TEAM_ID || "",
  APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY || "",
};

export default config;


