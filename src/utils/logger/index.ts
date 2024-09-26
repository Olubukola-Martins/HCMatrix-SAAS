export const appLogger = () => {
  if (process.env.DEBUG) {
    return console;
  }
};

export const logger = appLogger();
