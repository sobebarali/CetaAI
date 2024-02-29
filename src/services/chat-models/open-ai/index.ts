import { ChatOpenAI } from "@langchain/openai";
import { config } from "../../../configs";
import cache from "../../cache/redis";

const chatModel = new ChatOpenAI({
  openAIApiKey: config.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
  cache,
});

export default chatModel;
