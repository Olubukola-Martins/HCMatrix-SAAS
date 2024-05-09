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
  let code, number;
  if (phoneNumber.split("-").length === 2) {
    code = phoneNumber.split("-")[0];
    number = phoneNumber.split("-")[1];
  } else {
    code = "";
    number = phoneNumber.split("-")[1];
  }
  return {
    code,
    number,
  };
};
