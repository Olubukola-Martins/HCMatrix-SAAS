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
export const numberInputValidationRules: Rule[] = [
  ...generalValidationRules,
  { type: "number" },
];
export const numberInputValidationRulesOp: Rule[] = [
  ...generalValidationRulesOp,
  { type: "number" },
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
export function isValidEvalExpression(
  expression: string,
  variables?: string[]
) {
  try {
    // Use eval to check if the expression is valid
    const parsedExpression = `${variables
      ?.filter((value, index, self) => self.indexOf(value) === index)
      ?.map((item) => `const ${item} = 0;`)
      .join("")} ${expression};`;
    console.log(parsedExpression, "parsed");
    // eslint-disable-next-line no-eval
    eval(parsedExpression);
    return true;
  } catch (error) {
    console.log(error, "ERR");
    // If eval throws an error, the expression is invalid
    return false;
  }
}

export const isFormulaValid = (input: string, acceptedVariables: string[]) => {
  //regex to match JavaScript arithmetic symbols and one or more whitespace characters, also digits
  // no equals, user should not be able to assign
  const regex = /[\+\-\*\/\%\(\)\[\]\{\}\^\<\>\,\;\:\?\=\&\|\d]+|\s+/g;

  const recognizedWords = [...acceptedVariables];

  // Split the input string into an array of words using whitespace as the delimiter
  const inputWords = input.split(regex).filter((item) => item.trim() !== "");
  console.log(inputWords, "WHY");

  // Check if every word in the inputWords array is present in the wordArray
  return inputWords.every((word) => recognizedWords.includes(word));
};
const isValidVariableName = (name: string) => {
  const reservedKeywords = [
    // Add any additional reserved keywords here
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
  ];

  // Check if the name matches the basic constraints of a valid variable name
  const isValid = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);

  // Check if the name is a reserved keyword
  const isReserved = reservedKeywords.includes(name);

  // Return true if the name is valid and not a reserved keyword
  return isValid && !isReserved;
};
export const jsVariableNameValidationRule: Rule = {
  validator: async (rule, value = "") => {
    // Convert the value to its label equivalent
    const parsedValue = (value as string).trim().split(" ").join("_");
    if (!isValidVariableName(parsedValue))
      throw new Error("Please enter a valid variable name");
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
