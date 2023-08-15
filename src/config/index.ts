import { getEnv } from "../helpers/common.js";
let apiKey = getEnv("API_KEY");
export default {
  environment: getEnv("NODE_ENV"),
  app: {
    header: getEnv("APP_HEADER_TITLE", "CHAT GPT App"),
    footer: getEnv("APP_FOOTER_TITLE", "Finished"),
  },
  model: getEnv("MODEL", "gpt-4"),
  temperature: getEnv("TEMPERATURE", 0.7),
  maxTokens: getEnv("MAX_TOKENS", 256),
  topP: getEnv("TOP_P", 1),
  frequencyPenalty: getEnv("FREQUENCY_PENALTY", 0),
  presencePenalty: getEnv("PRESENCE_PENALTY", 0),
  inputFilesPath: getEnv("INPUT_FILES_PATH", "csvInput/"),
  outputFilesPath: getEnv("OUTPUT_FILES_PATH", "csvOutput/"),
  apiKey: apiKey,
  prompt: getEnv("PROMPT", "Write 5 alternate questions to: "),
};
