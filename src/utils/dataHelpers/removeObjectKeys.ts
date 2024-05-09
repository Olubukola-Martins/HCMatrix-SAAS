export const removeObjectKeys = (
  obj: { [key: string]: any },
  keys: string[]
) => {
  const newObj: { [key: string]: any } = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !keys.includes(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};
