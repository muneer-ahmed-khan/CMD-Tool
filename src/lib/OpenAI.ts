import { Configuration, OpenAIApi } from "openai";
import Spinner from "../utils/Spinner.js";
import { GPTConfig } from "../services/types/gptConfig.js";
import colors from "colors";

class OpenAI {
  private openAI: any;

  async connectToOpenAI(apiKey: string) {
    const configuration = new Configuration({
      apiKey,
    });

    this.openAI = new OpenAIApi(configuration);
  }

  async askGPT(GPTConfig: GPTConfig, userInput?: string): Promise<string> {
    const prompt_and_input = GPTConfig.PROMPT + (userInput ? userInput : "");

    Spinner.startSpinner();
    console.log(colors.bgRed(`Asking GPT --> ${prompt_and_input}\n`));

    try {
      let res: any = await this.openAI.createChatCompletion({
        model: GPTConfig.MODEL,
        messages: [
          {
            role: "user",
            content: prompt_and_input + "?",
          },
        ],
        temperature: GPTConfig.TEMPERATURE,
        max_tokens: GPTConfig.MAX_TOKENS,
        top_p: GPTConfig.TOP_P,
        frequency_penalty: GPTConfig.FREQUENCY_PENALTY,
        presence_penalty: GPTConfig.PRESENCE_PENALTY,
      });

      let cleanOutput: string;

      if (res && res.status === 200) {
        cleanOutput = res.data.choices[0].message.content
          .replace(/«/g, "")
          .replace(/»/g, "")
          .replace(/\n\n/g, " ");

        Spinner.successSpinner();
        console.log(colors.bgBlue(`GPT Answer --> ${cleanOutput}`));
      } else {
        console.log(colors.red("GPT Answer: Failed"));
        Spinner.failureSpinner();
        console.log("failed");

        throw new Error("Open AI Chat Completion API failed to response");
      }

      return cleanOutput;
    } catch (err) {
      if (err.response?.data?.error?.code === "invalid_api_key") {
        console.log("error ", err.response.data.error.message);

        process.exit(1);
      } else {
        return err;
      }
    }
  }
}

export default OpenAI;
