export const stringIsIncludedInArray = (val: string, arr: string[]) => {
  return arr.map((val) => val.toLowerCase()).includes(val.toLowerCase());
};
