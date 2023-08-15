import OpenAI from "../lib/OpenAI.js";
import { delayFlow } from "../helpers/common.js";

import FileSystem from "../services/FileSystem.js";
import Spinner from "../utils/Spinner.js";
import colors from "colors";
import { GPTConfig } from "../services/types/gptConfig.js";

class GenerateFIle {
  private fileSystem: FileSystem;
  private openAI: OpenAI;
  private inputFileName: string;

  constructor() {
    this.fileSystem = new FileSystem();
    this.openAI = new OpenAI();
  }

  public async processInputFileWithGPT(
    GPTConfig: GPTConfig,
    inputFileName: string
  ): Promise<void> {
    this.inputFileName = inputFileName;

    const inputFileQueries = await this.readInputFileQueries();

    const chatGPTResponses = await this.askInputQueriesFromChatGPT(
      GPTConfig,
      inputFileQueries
    );

    await this.writeResponsesToCsvFile(chatGPTResponses);
  }

  private async readInputFileQueries(): Promise<Array<Array<string>>> {
    Spinner.startSpinner();

    console.log(colors.stripColors("processing input file fields"));

    const inputFileQueries: Array<Array<string>> =
      await this.fileSystem.readInputQueries(this.inputFileName);

    delayFlow();
    Spinner.successSpinner();

    console.log(
      colors.bold.italic("done reading input file content as follows")
    );
    console.log(inputFileQueries, "\n");

    return inputFileQueries;
  }

  private async askInputQueriesFromChatGPT(
    GPTConfig: GPTConfig,
    inputFileQueries: Array<Array<string>>
  ): Promise<Array<Array<string>>> {
    let responses: Array<Array<string>> = [];

    this.openAI.connectToOpenAI(GPTConfig.API_KEY);

    for (let index: number = 1; index < inputFileQueries.length; index++) {
      let filterResult: Array<string> = [];

      for (
        let item: number = 0;
        item < inputFileQueries[index].length;
        item++
      ) {
        let result: any = await this.openAI.askGPT(
          GPTConfig,
          inputFileQueries[index][item]
        );
        filterResult.push(result);
      }
      console.log(
        `${colors.gray(
          "\n========================= input row completed =========================\n"
        )}`
      );

      responses.push(filterResult);
    }
    return responses;
  }

  private async writeResponsesToCsvFile(
    chatGPTResponses: Array<Array<string>>
  ) {
    Spinner.startSpinner();
    console.log(colors.bgCyan.bold("writing responses to output file."));

    const outputFile = await this.fileSystem.writeToCSVFile(
      chatGPTResponses,
      this.inputFileName
    );

    delayFlow();
    Spinner.successSpinner();

    console.log(
      `done processing! you output file is ready with name --> ${colors.green.bold(
        outputFile
      )} in the ${colors.bold("csvOutput")} directory.`
    );
  }
}

export default GenerateFIle;
