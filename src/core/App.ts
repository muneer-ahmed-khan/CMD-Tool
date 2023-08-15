import colors from "colors";
import clear from "clear";
import figlet from "figlet";
import UserSurvey from "../controllers/UserSurvey.js";
import GenerateFIle from "../controllers/GenerateFile.js";
import config from "../config/index.js";
import { appUseEnum } from "../services/types/promptOptions.js";
import InteractiveMode from "../controllers/InteractiveMode.js";

class App {
  private userSurvey: UserSurvey;
  private generateFile: GenerateFIle;
  private interactiveMode: InteractiveMode;

  constructor() {
    this.userSurvey = new UserSurvey();
    this.generateFile = new GenerateFIle();
    this.interactiveMode = new InteractiveMode();
    this.initializeApp();
  }

  private async initializeApp() {
    this.appHeader();

    const { GPTConfig, userProvidedInputFileName, appUse } =
      await this.userSurvey.startUserPrompt();

    if (appUse === appUseEnum.FILE_MODE) {
      await this.generateFile.processInputFileWithGPT(
        GPTConfig,
        userProvidedInputFileName
      );
    } else {
      await this.interactiveMode.askInteractivelyFromChatGPT(GPTConfig);
    }

    this.appFooter();
  }

  private appHeader(): void {
    clear();

    console.log(
      colors.magenta.underline(
        figlet.textSync(config.app.header, {
          verticalLayout: "full",
          width: 80,
        })
      ),
      "\n\n"
    );
  }

  private appFooter(): void {
    console.log(
      colors.grey.underline(
        figlet.textSync("Finish", {
          verticalLayout: "full",
          width: 45,
        })
      ) + "\n\n"
    );
  }
}

export default App;
