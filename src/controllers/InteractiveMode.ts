import OpenAI from "../lib/OpenAI.js";
import { GPTConfig } from "../services/types/gptConfig.js";

import PromptFlow from "../services/PromptFlow.js";

class GenerateFIle {
  private openAI: OpenAI;
  private promptFlow: PromptFlow;

  constructor() {
    this.openAI = new OpenAI();
    this.promptFlow = new PromptFlow();
  }

  public async askInteractivelyFromChatGPT(
    GPTConfig: GPTConfig,
    tryAgain?: boolean
  ): Promise<void> {
    this.openAI.connectToOpenAI(GPTConfig.API_KEY);

    if (tryAgain) {
      GPTConfig.PROMPT = await this.promptFlow.askPromptText();
    }

    await this.openAI.askGPT(GPTConfig);

    const askAgain = await this.promptFlow.askAgain();
    if (askAgain) return this.askInteractivelyFromChatGPT(GPTConfig, askAgain);

    return;
  }
}

export default GenerateFIle;
