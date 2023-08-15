import config from "../config/index.js";

export const constants = {
  GPT_CONFIG: {
    MODEL: config.model,
    PROMPT: config.prompt,
    TEMPERATURE: +config.temperature,
    MAX_TOKENS: +config.maxTokens,
    TOP_P: +config.topP,
    FREQUENCY_PENALTY: +config.frequencyPenalty,
    PRESENCE_PENALTY: +config.presencePenalty,
    API_KEY: config.apiKey,
    INPUT_FILES_PATH: config.inputFilesPath,
    OUTPUT_FILES_PATH: config.outputFilesPath,
  },
};
