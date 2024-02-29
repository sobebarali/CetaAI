import { OpenAI } from "@langchain/openai";
import { config } from "../../../configs";
import cache from "../../cache/redis";

const llm = new OpenAI({
  openAIApiKey: config.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo-instruct",
  cache,
});

export default llm;
