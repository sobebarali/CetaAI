import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "../../../../configs";
import { Document } from "../../../types";
export default async function createIndexFromDocs({
  docs,
}: {
  docs: Document[];
}) {
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    new OpenAIEmbeddings({
      openAIApiKey: config.OPENAI_API_KEY,
    }),
    {
      url: config.QDRANT_URL,
      apiKey: config.QDRANT_API_KEY,
    }
  );

  return vectorStore;
}
