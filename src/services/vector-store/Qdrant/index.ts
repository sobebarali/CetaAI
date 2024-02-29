import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "../../../configs";

export const qdrantVectorStore = new QdrantVectorStore(
  new OpenAIEmbeddings({
    openAIApiKey: config.OPENAI_API_KEY,
  }),
  {
    url: config.QDRANT_URL,
    apiKey: config.QDRANT_API_KEY,
  }
);


