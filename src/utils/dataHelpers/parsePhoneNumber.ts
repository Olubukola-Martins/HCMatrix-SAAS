export const parsePhoneNumber = (
  phoneNumber?: string
): {
  code: string;
  number: string;
} => {
  if (!phoneNumber)
    return {
      code: "",
      number: "",
    };
  const code = phoneNumber.split("-")[0];
  const number = phoneNumber.split("-")[1];
  return {
    code,
    number,
  };
};
