export const isValidNumber = ({ str = "" }: { str?: string }) => {
  return /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(str.trim());
};
