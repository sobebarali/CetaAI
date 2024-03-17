import { ChatAnthropic } from "@langchain/anthropic";
import cache from "../../cache/redis";
import config from "../../../configs";

const anthropicChatModel = new ChatAnthropic({
    anthropicApiKey: config.ANTHROPIC_API_KEY,
    modelName: "claude-3-sonnet-20240229",
    cache
});

export default anthropicChatModel;
