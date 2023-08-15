import { constants } from "../constants/modelOptions.js";
import colors from "colors";
import PromptFlow from "../services/PromptFlow.js";
import { GPTConfig } from "../services/types/gptConfig.js";
import { appUseEnum } from "../services/types/promptOptions.js";

const GPTConfig: GPTConfig = constants.GPT_CONFIG;

class UserSurvey {
  private promptFlow: PromptFlow;
  private userProvidedInputFileName: string;

  constructor() {
    this.promptFlow = new PromptFlow();
  }

  public async startUserPrompt(): Promise<{
    GPTConfig: GPTConfig;
    userProvidedInputFileName: string;
    appUse: string;
  }> {
    console.log(colors.red.underline("Hallo and Welcome to Chat GPT App.\n"));

    const appUse: string = await this.promptFlow.askHowToUseApp();

    if (appUse === appUseEnum.FILE_MODE) {
      this.userProvidedInputFileName = await this.promptFlow.askInputFileName();
    }

    if (appUse === appUseEnum.INTERACTIVE_MODE) {
      const userPromptText = await this.promptFlow.askPromptText();

      GPTConfig.PROMPT = userPromptText as string;
    }

    const { overrideSettings } = await this.promptFlow.askOverrideSettings();

    if (overrideSettings) {
      let settings = await this.promptFlow.askUpdateSettings();

      GPTConfig[settings.lastChangeSettings] =
        settings.lastChangeSettings === "MODEL"
          ? settings[settings.lastChangeSettings]
          : Number(settings[settings.lastChangeSettings]);

      let askAgain: boolean = true;

      while (askAgain) {
        askAgain = await this.promptFlow.askMoreSettingsUpdate();
        if (askAgain) {
          settings = await this.promptFlow.askUpdateSettings();

          GPTConfig[settings.lastChangeSettings] =
            settings.lastChangeSettings === "MODEL"
              ? settings[settings.lastChangeSettings]
              : Number(settings[settings.lastChangeSettings]);
        }
      }
    }

    console.log(
      `\nGPT Api settings are as follows:\n ${colors.yellow(
        JSON.stringify(GPTConfig, null, 3)
      )}\n`
    );

    return {
      GPTConfig,
      userProvidedInputFileName: this.userProvidedInputFileName,
      appUse,
    };
  }
}

export default UserSurvey;
