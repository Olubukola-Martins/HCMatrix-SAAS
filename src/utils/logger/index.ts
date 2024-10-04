export const appLogger = () => {
  if (process.env.REACT_APP_DEBUG === "true") {
    return console;
  }
};

export const logger = appLogger();
