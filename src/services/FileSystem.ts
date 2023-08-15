import fs from "fs";
import { constants } from "../constants/modelOptions.js";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";
import { delayFlow } from "../helpers/common.js";
import path from "path";
import colors from "colors";

class FileSystem {
  private readonly inputFilesPath = path.resolve(
    __dirname,
    `../../${constants.GPT_CONFIG.INPUT_FILES_PATH}`
  );
  private readonly outputFilesPath = path.resolve(
    __dirname,
    `../../${constants.GPT_CONFIG.OUTPUT_FILES_PATH}`
  );

  public fileExists(fileName: string) {
    try {
      fileName = `${this.inputFilesPath}/${fileName}`;

      if (fs.existsSync(fileName)) {
        delayFlow();
        return true;
      } else {
        delayFlow();
        return false;
      }
    } catch (reason) {
      console.log(colors.red("error in fileExists call: " + reason));
      return false;
    }
  }

  private async folderExistsOrCreateOne(folderName: string): Promise<boolean> {
    try {
      if (fs.existsSync(folderName)) {
        return true;
      } else {
        console.log(
          colors.yellow(
            "folder does not exist creating new one -->" + folderName
          )
        );
        fs.mkdirSync(folderName);
        return true;
      }
    } catch (reason) {
      console.log(
        colors.red("error in folderExistsOrCreateOne call: " + reason)
      );
      return false;
    }
  }

  private readCSVFile(inputFileName: string): Promise<Array<Array<string>>> {
    return new Promise(async (resolve, reject) => {
      let data: Array<Array<string>> = [];

      fs.createReadStream(`${this.inputFilesPath}/${inputFileName}`)
        .pipe(parse({ delimiter: "|" }))
        .on("data", (row) => {
          data.push(row);
        })
        .on("end", () => {
          resolve(data);
        })
        .on("error", () => {
          reject("error in reading input file");
        });
    });
  }

  public async readInputQueries(
    inputFileName: string
  ): Promise<Array<Array<string>>> {
    let queries: Array<Array<string>> = await this.readCSVFile(inputFileName);

    return queries;
  }

  public async writeToCSVFile(
    outputFields: Array<Array<string>>,
    inputFileName: string
  ) {
    try {
      await this.folderExistsOrCreateOne(this.outputFilesPath);

      const outputFile = `${this.outputFilesPath}/${inputFileName}`;
      const outputFileWritableStream = fs.createWriteStream(outputFile);

      let inputFileData: Array<Array<string>> = await this.readCSVFile(
        inputFileName
      );

      const outputFileColumnsHeaders: Array<string> = ["Input", "Output"];

      const writeToCSVOutputFile = stringify({
        header: true,
        columns: outputFileColumnsHeaders,
        delimiter: "|",
      });

      for (let index: number = 1; index < inputFileData.length; index++) {
        writeToCSVOutputFile.write([
          ...inputFileData[index],
          ...outputFields[index - 1],
        ]);
      }

      writeToCSVOutputFile.pipe(outputFileWritableStream);

      return inputFileName;
    } catch (err) {
      console.log("error in writing to file");
      return err;
    }
  }
}

export default FileSystem;
