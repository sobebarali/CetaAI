import { ChatOpenAI } from "@langchain/openai";
import cache from "../../cache/redis";
import config from "../../../configs";

const openAIChatModel = new ChatOpenAI({
  openAIApiKey: config.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
  cache,
});

export default openAIChatModel;
