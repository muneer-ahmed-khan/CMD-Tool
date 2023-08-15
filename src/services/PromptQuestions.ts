import { listType, appUseEnum } from "./types/promptOptions";

class PromptQuestions {
  public promptHowToUseApp(): Array<listType> {
    return [
      {
        name: "appUse",
        type: "list",
        message: "How do you want to Use App?",
        choices: [
          {
            key: 1,
            name: "As a Interactive Chat GPT App",
            value: appUseEnum.INTERACTIVE_MODE,
          },
          {
            key: 2,
            name: "Read queries from input file",
            value: appUseEnum.FILE_MODE,
          },
        ],
      },
    ];
  }

  public promptUserInputFileName(askAgain: boolean = false) {
    return [
      {
        name: "fileName",
        message: askAgain
          ? "Enter the correct Input file Name again with file extension?"
          : "Enter the Input file Name with file extension?",
        validate(value: string) {
          const pass = value.length;

          if (pass) {
            return true;
          }

          return "file name can't be empty Please enter a valid FileName.";
        },
      },
    ];
  }

  public askPromptText() {
    return [
      {
        type: "input",
        name: "promptText",
        message: "Enter the Prompt Text for GPT?",
        validate(value: string) {
          const pass = value.length;
          if (pass) {
            return true;
          }

          return "Prompt Text can't be Empty Please Enter Prompt Text again.";
        },
      },
    ];
  }

  public askPromptTextAgain() {
    return [
      {
        type: "confirm",
        name: "askAgain",
        message: "do you want to ask again?",
        default: false,
      },
    ];
  }

  public askOverrideSettings() {
    return [
      {
        type: "confirm",
        name: "overrideSettings",
        message: "do you want to override the GPT default Settings?",
        default: false,
      },
    ];
  }

  public askUpdateSettings() {
    return [
      {
        type: "list",
        name: "lastChangeSettings",
        message:
          "Please Select the configuration you want to override for GPT API call?",
        choices: [
          "MODEL",
          "TEMPERATURE",
          "MAX_TOKENS",
          "TOP_P",
          "FREQUENCY_PENALTY",
          "PRESENCE_PENALTY",
        ],
      },
      {
        type: "input",
        name: "MODEL",
        message: "Enter the Model Name?",
        when(answers: any) {
          return answers.lastChangeSettings === "MODEL";
        },
        validate(value: string) {
          const pass = value.length;
          if (pass) {
            return true;
          }

          return "Model Name can't be Empty Please Enter Model name again.";
        },
      },
      {
        type: "input",
        name: "MAX_TOKENS",
        message: "Enter the max_tokens value?",
        when(answers: any) {
          return answers.lastChangeSettings === "MAX_TOKENS";
        },
        validate(value: string) {
          const valid = !isNaN(+value);
          if (valid && value.length) {
            return true;
          }

          if (!value.length)
            return "max_tokens value can't be Empty Please Enter max_tokens value again.";
          else return "Please enter a number value for max_tokens value.";
        },
      },
      {
        type: "input",
        name: "TEMPERATURE",
        message: "Enter the temperature value?",
        when(answers: any) {
          return answers.lastChangeSettings === "TEMPERATURE";
        },
        validate(value: string) {
          const valid = !isNaN(+value);
          if (valid && value.length) {
            return true;
          }

          if (!value.length)
            return "Temperature value can't be Empty Please Enter Temperature value again.";
          else return "Please enter a number value for temperature value.";
        },
      },
      {
        type: "input",
        name: "TOP_P",
        message: "Enter the top_p value?",
        when(answers: any) {
          return answers.lastChangeSettings === "TOP_P";
        },
        validate(value: string) {
          const valid = !isNaN(+value);
          if (valid && value.length) {
            return true;
          }

          if (!value.length)
            return "top_p value can't be Empty Please Enter top_p value again.";
          else return "Please enter a number value for top_p value.";
        },
      },
      {
        type: "input",
        name: "FREQUENCY_PENALTY",
        message: "Enter the frequency_penalty value?",
        when(answers: any) {
          return answers.lastChangeSettings === "FREQUENCY_PENALTY";
        },
        validate(value: string) {
          const pass = value.length;
          if (pass) {
            return true;
          }

          return "frequency_penalty value can't be Empty Please Enter frequency_penalty value again.";
        },
      },
      {
        type: "input",
        name: "PRESENCE_PENALTY",
        message: "Enter the presence_penalty value?",
        when(answers: any) {
          return answers.lastChangeSettings === "PRESENCE_PENALTY";
        },
        validate(value: string) {
          const pass = value.length;
          if (pass) {
            return true;
          }

          return "presence_penalty value can't be Empty Please Enter presence_penalty value again.";
        },
      },
    ];
  }

  public askMoreSettingsChange() {
    return [
      {
        type: "confirm",
        name: "overrideMoreSettings",
        message: "do you want to override more GPT default Settings?",
        default: false,
      },
    ];
  }
}

export default PromptQuestions;
