import inquirer from "inquirer";
import PromptQuestions from "./PromptQuestions.js";
import FileSystem from "./FileSystem.js";
import Spinner from "../utils/Spinner.js";
import colors from "colors";
import { appUseEnum } from "./types/promptOptions.js";

class PromptFlow {
  private promptQuestions: PromptQuestions;
  private fileSystem: FileSystem;

  constructor() {
    this.promptQuestions = new PromptQuestions();
    this.fileSystem = new FileSystem();
  }

  public async askHowToUseApp(): Promise<string> {
    const { appUse } = await inquirer.prompt(
      this.promptQuestions.promptHowToUseApp()
    );

    return appUse;
  }

  public async askAgain(): Promise<boolean> {
    const { askAgain } = await inquirer.prompt(
      this.promptQuestions.askPromptTextAgain()
    );

    return askAgain;
  }

  public async askInputFileName(askAgain?: boolean): Promise<string> {
    try {
      const answers = await inquirer.prompt(
        this.promptQuestions.promptUserInputFileName(askAgain)
      );

      console.log("checking the file in input files directory");
      Spinner.startSpinner();

      const fileExist = this.fileSystem.fileExists(answers.fileName);

      if (fileExist) {
        console.log("file exists: " + colors.green.bold(answers.fileName));
        Spinner.successSpinner();

        return answers.fileName;
      } else {
        console.log(
          `file with name ${colors.red.bold(
            answers.fileName
          )} does not exist in the input files directory.`
        );
        Spinner.failureSpinner();

        const response = await this.askInputFileName(true);
        return response;
      }
    } catch (reason) {
      console.log(colors.red("Error in askInputFileName Call: " + reason));
      return;
    }
  }

  public async askPromptText(): Promise<string> {
    try {
      const { promptText } = await inquirer.prompt(
        this.promptQuestions.askPromptText()
      );

      return promptText;
    } catch (reason) {
      console.log(colors.red("Error in askPromptText Call: " + reason));
      return;
    }
  }

  public async askOverrideSettings(): Promise<{
    [index: string]: boolean | string;
  }> {
    try {
      const answers = await inquirer.prompt(
        this.promptQuestions.askOverrideSettings()
      );

      return answers;
    } catch (reason) {
      console.log(colors.red("Error in askOverrideSettings Call: " + reason));
      return;
    }
  }

  public async askUpdateSettings() {
    try {
      const answers = await inquirer.prompt(
        this.promptQuestions.askUpdateSettings()
      );

      return answers;
    } catch (reason) {
      console.log(
        colors.red("Error in askForConfigurationSettingChange Call: " + reason)
      );
      return;
    }
  }

  public async askMoreSettingsUpdate() {
    try {
      const answers = await inquirer.prompt(
        this.promptQuestions.askMoreSettingsChange()
      );

      return answers.overrideMoreSettings;
    } catch (reason) {
      console.log(
        colors.red("Error in askForConfigurationSettingChange Call: " + reason)
      );
      return;
    }
  }
}

export default PromptFlow;
