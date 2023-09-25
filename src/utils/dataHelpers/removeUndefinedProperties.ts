export const removeUndefinedProperties = (obj: { [key: string]: any }) => {
  const newObj: { [key: string]: any } = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] !== "undefined") {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};
