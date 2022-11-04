export const generalValidationRules = [
  { required: true, message: "Field is required!" },
];

export const emailValidationRules = [
  {
    required: true,
    message: "Field is required",
  },
  {
    type: "email",
    message: "Invalid Email Address",
  },
];
