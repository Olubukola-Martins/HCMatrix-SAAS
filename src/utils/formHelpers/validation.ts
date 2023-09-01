import { Rule } from "antd/lib/form";

export const generalValidationRules: Rule[] = [
  { required: true, message: "Field is required!" },
];
export const generalValidationRulesOp: Rule[] = [
  { required: false, message: "Field is required!" },
];

export const textInputValidationRules: Rule[] = [
  ...generalValidationRules,
  { whitespace: true },
];
export const textInputValidationRulesOp: Rule[] = [
  ...generalValidationRulesOp,
  { whitespace: true },
];

export const textInputValidationRulesOpt: Rule[] = [
  { whitespace: true },
  { required: false },
];

export const emailValidationRules: Rule[] = [
  {
    required: true,
    message: "Field is required",
  },
  {
    type: "email",
    message: "Invalid Email Address",
  },
];
export const emailValidationRulesOp: Rule[] = [
  {
    required: false,
    message: "Field is required",
  },
  {
    type: "email",
    message: "Invalid Email Address",
  },
];

export const passwordValidationRules: Rule[] = [
  {
    required: true,
  },
  { message: "Field is required" },

  {
    validator: async (rule, value) => {
      let paswd =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

      if (!paswd.test(value))
        throw new Error(
          "Password should contain at least one digit and special character and a letter in uppercase, and least 8 characters"
        );
      // if (false) throw new Error("Something wrong!");
      return true;
    },
  },
];

export const urlValidationRule: Rule = {
  validator: async (rule, value) => {
    let paswd = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!value.match(paswd)) throw new Error("Please enter a valid url");
    // if (false) throw new Error("Something wrong!");
    return true;
  },
};

export const phoneNumberValidationRule: Rule = {
  validator: async (rule, value) => {
    let paswd = /^[0-9]*$/;

    if (!value.match(paswd)) throw new Error("Only digits are allowed");
    // if (false) throw new Error("Something wrong!");
    return true;
  },
};

export const validateUrl1 = (_: any, value: string) => {
  if (value && !/^https?:\/\/\S+$/.test(value)) {
    return Promise.reject("Invalid URL");
  }
  return Promise.resolve();
};

export const validateUrl: Rule[] = [
  { required: true, message: "Please enter a URL" },
  {
    validator: (_: any, value: string) => {
      if (value && !/^https?:\/\/\S+$/.test(value)) {
        return Promise.reject("Invalid URL");
      }
      return Promise.resolve();
    },
  },
];
