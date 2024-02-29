import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "../../../../configs";
export default async function createIndexFromTexts({
  texts,
  metadatas,
}: {
  texts: string[];
  metadatas: object[] | object;
}) {
  const vectorStore = await QdrantVectorStore.fromTexts(
    texts,
    metadatas,
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
