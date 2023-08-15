export const getEnv = (key: string, defaultVal: any = null) => {
  return process.env[key] || defaultVal;
};

export const delayFlow = (): void => {
  let start: number = Date.now(),
    now: number = start;

  while (now - start < 1000) {
    now = Date.now();
  }

  return;
};
