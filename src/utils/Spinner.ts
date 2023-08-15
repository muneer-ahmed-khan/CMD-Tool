import ora from "ora";
import colors from "colors";

class Spinner {
  private mySpinner: any;

  constructor() {
    this.mySpinner = ora();
  }

  public async startSpinner() {
    this.mySpinner.text = colors.grey("in Process\t");
    // console.log("this. spiiner .text ", this.mySpinner.text);

    this.mySpinner.start();
  }

  successSpinner(): void {
    this.mySpinner.text = colors.bgGreen("Done\t");
    this.mySpinner.succeed();
  }

  failureSpinner() {
    this.mySpinner.text = colors.red("Failed\t");
    this.mySpinner.fail();
  }
}

export default new Spinner();
