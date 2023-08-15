interface choice {
  value: string;
  key: number;
  name: string;
}

export interface listType {
  name: string;
  type: string;
  message: string;
  choices: Required<Array<choice>>;
}

export enum appUseEnum {
  INTERACTIVE_MODE = "interactive",
  FILE_MODE = "file",
}
