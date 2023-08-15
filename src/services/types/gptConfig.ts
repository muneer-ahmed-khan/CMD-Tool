export interface GPTConfig {
  MODEL: string;
  PROMPT?: string;
  TEMPERATURE: number;
  MAX_TOKENS: number;
  TOP_P: number;
  FREQUENCY_PENALTY: number;
  PRESENCE_PENALTY: number;
  API_KEY?: string;
  INPUT_FILES_PATH?: string;
  OUTPUT_FILES_PATH?: string;
}
