import { Rule } from "antd/lib/form";
import {
  DEFAULT_MAX_FILE_UPLOAD_COUNT,
  DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB,
} from "constants/files";
import moment, { Moment } from "moment";
import { TFileType } from "types/files";

// helpers
export const isPhoneNumberValid = (val: string): boolean => {
  // Regular expression pattern to match a valid North American phone number with dashes
  const phonePattern = /^[0-9]*$/;

  // Test the provided value against the pattern
  return phonePattern.test(val);
};
export const isEmailValid = (val: string): boolean => {
  // Regular expression pattern to match a valid email address
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Test the provided value against the pattern
  return emailPattern.test(val);
};
export const countMatchingDatesInclusive = (
  start: Moment,
  end: Moment,
  dates: Moment[]
): number => {
  // Make sure the start date is before or equal to the end date
  if (end.isBefore(start)) {
    [start, end] = [end, start];
  }

  let currentDate = moment(start);
  let matchingCount = 0;

  while (currentDate.isSameOrBefore(end)) {
    if (dates.some((date) => date.isSame(currentDate, "day"))) {
      matchingCount++;
    }
    currentDate.add(1, "day"); // Move to the next day
  }

  return matchingCount;
};

export const countWeekendsInclusive = (start: Moment, end: Moment): number => {
  // Make sure the start date is before or equal to the end date
  if (end.isBefore(start)) {
    [start, end] = [end, start];
  }

  let currentDate = moment(start);
  let weekendCount = 0;

  while (currentDate.isSameOrBefore(end)) {
    if (currentDate.isoWeekday() === 6 || currentDate.isoWeekday() === 7) {
      // Check if it's a Saturday (6) or Sunday (7)
      weekendCount++;
    }
    currentDate.add(1, "day"); // Move to the next day
  }

  return weekendCount;
};

export const isDateGreaterThanCurrentDay = (date: Moment) => {
  const currentDate = moment();
  if (!date) return;
  return date.isAfter(currentDate, "day"); // Check if selected date is greater than the current day
};
export const isDateGreaterThanOrEqualToCurrentDay = (date: Moment) => {
  const currentDate = moment();
  if (!date) return;
  return date.isSameOrAfter(currentDate, "day"); // Check if selected date is greater than the current day
};
export const isDateLesserThanOrEqualToCurrentDay = (date: Moment) => {
  const currentDate = moment();
  if (!date) return;
  return date.isSameOrBefore(currentDate, "day"); // Check if selected date is greater than the current day
};
// helpers -end

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
  {
    required: false,
    message: "Please input a non-empty value",
    whitespace: true,
  },
];
export const numberHasToBeAWholeNumberRule: Rule = {
  validator: async (val, value: any) => {
    if (typeof value !== "number") {
      throw new Error("Please enter a valid number!");
    }
    if (typeof value === "number" && +value === 0) {
      throw new Error("Please enter a value greater than 0!");
    }
    if (!Number.isInteger(value)) {
      throw new Error("Please enter a whole number");
    }

    return true;
  },
};
export type TCeateFileValidationRuleProps = {
  required?: boolean;
  maxFileSize?: number;
  allowedFileTypes: TFileType[];
  maxFileUploadCount?: number;
};
export const createFileValidationRule = (
  props: TCeateFileValidationRuleProps
): Rule => {
  const {
    required = true,
    maxFileSize = DEFAULT_MAX_FILE_UPLOAD_SIZE_IN_MB,
    allowedFileTypes,
    maxFileUploadCount = DEFAULT_MAX_FILE_UPLOAD_COUNT,
  } = props;
  return {
    required,

    validator: async (_, value) => {
      // non required
      if (required === false && Array.isArray(value) === false) {
        return true;
      }
      if (
        required === false &&
        Array.isArray(value) === true &&
        value?.length === 0
      ) {
        return true;
      }
      // required
      if (Array.isArray(value) === false || value?.length === 0) {
        throw new Error("Please upload a file");
      }
      if (Array.isArray(value) === true && value?.length > maxFileUploadCount) {
        throw new Error(
          "You can only upload a maximum of " + maxFileUploadCount + " files"
        );
      }
      (value as any[]).forEach((item, i) => {
        const file = item?.originFileObj;
        const isLt2M = file.size / 1024 / 1024 <= maxFileSize;

        if (!isLt2M) {
          throw new Error(
            `File ${i + 1} must smaller than or equal to ${maxFileSize}MB!`
          );
        }
        if (!allowedFileTypes.includes(file.type as TFileType)) {
          throw new Error(
            `File ${i + 1}: This file type (${file.type}) is not allowed!`
          );
        }
      });

      return true;
    },
  };
};
export const numberHasToBeInRange = (_min: number, _max: number): Rule => ({
  validator: async (_: any, value: any) => {
    if (typeof value !== "number") {
      throw new Error("Please enter a valid number!");
    }
    if ((+value >= _min && +value <= _max) === false) {
      throw new Error(`Please enter a within the range of ${_min} to ${_max}`);
    }

    return true;
  },
});
export const numberHasToBeGreaterThanValueRule = (_value: number): Rule => ({
  validator: async (_: any, value: any) => {
    if (typeof value !== "number") {
      throw new Error("Please enter a valid number!");
    }
    if (+value <= _value) {
      throw new Error(`Please enter a number greater than ${_value}`);
    }

    return true;
  },
});
export const numberHasToBeGreaterThanZeroRule: Rule = {
  validator: async (_: any, value: any) => {
    if (typeof value !== "number") {
      throw new Error("Please enter a valid number!");
    }
    if (+value <= 0) {
      throw new Error("Please enter a number greater than 0");
    }

    return true;
  },
};
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

export const dateHasToBeGreaterThanCurrentDayRule: Rule = {
  validator: async (rule, value) => {
    if (!isDateGreaterThanCurrentDay(value)) {
      throw new Error("Please select a date greater than the current day");
    }

    return true;
  },
};
export const dateHasToBeLesserThanOrEqualToCurrentDayRule: Rule = {
  validator: async (rule, value) => {
    if (!isDateLesserThanOrEqualToCurrentDay(value)) {
      throw new Error("Please select a day before today or today");
    }

    return true;
  },
};
export const dateHasToBeGreaterThanCurrentDayRuleForRange: Rule = {
  validator: async (rule, value) => {
    if (Array.isArray(value) === false) {
      throw new Error("Please select a make a date selection");
    }
    if (!isDateGreaterThanCurrentDay(value[0])) {
      throw new Error("Please select a date greater than the current day");
    }
    if (!isDateGreaterThanCurrentDay(value[1])) {
      throw new Error("Please select a date greater than the current day");
    }

    return true;
  },
};
export const dateHasToBeGreaterThanOrEqualToCurrentDayRule: Rule = {
  validator: async (rule, value) => {
    if (!isDateGreaterThanOrEqualToCurrentDay(value)) {
      throw new Error(
        "Please select a date greater than or equal to the current day"
      );
    }

    return true;
  },
};
export const dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange: Rule = {
  validator: async (rule, value) => {
    if (Array.isArray(value) === false || value?.length === 0) {
      throw new Error("Please select a date range");
    }
    if (!isDateGreaterThanOrEqualToCurrentDay(value[0])) {
      throw new Error(
        "Please select a date greater than or equal to the current day"
      );
    }
    if (!isDateGreaterThanOrEqualToCurrentDay(value[1])) {
      throw new Error(
        "Please select a date greater than or equal to the current day"
      );
    }

    return true;
  },
};
export const dateHasToBeLesserThanOrEqualToCurrentDayRuleForRange: Rule = {
  validator: async (_, value) => {
    if (!isDateLesserThanOrEqualToCurrentDay(value[0])) {
      throw new Error("Please select a date lesser than or equal to today!");
    }
    if (!isDateLesserThanOrEqualToCurrentDay(value[1])) {
      throw new Error("Please select a date lesser than or equal to today!");
    }

    return true;
  },
};

export const urlValidationRule: Rule = {
  validator: async (rule, value) => {
    if (!value) return true; //ensures that when value is not required it passes
    let validUrlPattern =
      /^https:\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/; //note this pattern will only allow 4 https and not http or any other protocols

    if (!value.match(validUrlPattern))
      throw new Error("Please enter a valid url, eg: https://example.com");
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
  // const regex = /[\+\-\*\/\%\(\)\[\]\{\}\^\<\>\,\;\:\?\=\&\|\d]+|\s+/g;
  const regex = /[\+\-\*\/\%\(\)\[\]\{\}\^\<\>\,\;\:\?\=\&\|\d\.]+|\s+/g;

  const recognizedWords = [...acceptedVariables, "Infinity"];

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
  required: true,
  whitespace: true,
  validator: async (rule, value) => {
    if (value !== undefined && isPhoneNumberValid(value) === false)
      throw new Error("Pleas enter a valid phone number");
    // if (false) throw new Error("Something wrong!");
    return true;
  },
};
export const phoneNumberValidationRuleOp: Rule = {
  required: false,
  whitespace: true,
  validator: async (rule, value) => {
    if (value !== undefined && isPhoneNumberValid(value) === false)
      throw new Error("Pleas enter a valid phone number");
    // if (false) throw new Error("Something wrong!");
    return true;
  },
};

export const validateTimeFrameForManualRepayment: Rule = {
  required: true,
  validator: async (_: any, value: number | string) => {
    if (typeof value === "undefined") {
      throw new Error("Please enter a value");
    }
    if (typeof value !== "number") {
      throw new Error("Only numbers are allowed");
    }
    if (+value < 1) {
      throw new Error(
        "Please enter a day that is either 1st, 25th, or between 1st and 25th"
      );
    }
    if (+value > 25) {
      throw new Error(
        "Please enter a day that is either 1st, 25th, or between 1st and 25th"
      );
    }

    return true;
  },
};
