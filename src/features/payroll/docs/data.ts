// This file holds data that will be used to model payroll data
// Types of Payroll

export const employeePayrollEntry = {
  // this will  be for directSalary users
  empuid: "EMP007",
  isExpatriate: false,
  exchangeRate: 100, // for baseRate = 1, if another then the multipler will be used

  gross_pay: 20000,
  gross_pay_with_exchange_rate_accounted: 100000 * 100, // this should be gross pay multiplied by exchange rate
  taxable_income: "0", //can be 0 or a formula referencing other components
  taxPolicy: {
    formula:
      "taxable_income*0.5 >= 200000 ? 200000 : taxable_income*0.8 + taxable_income*0.2 ",
    dependencies: ["taxable_income"],
  },
  allowances: [
    {
      name: "thirthenth_month", //name of component && should be unique
      identifier: "thirthenth_month",
      formula: "0", //this could be an amount or a formula referencing other components
      dependencies: [],
    },
    {
      name: "meal allowance", //name of component && should be unique
      identifier: "meal_allowance",
      formula: "1000", //this could be an amount or a formula referencing other components
      dependencies: [],
    },
    {
      name: "tranport allowance", //name of component && should be unique
      identifier: "transport_allowance",
      formula:
        "meal_allowance * 2 * (0.08 * gross_pay_with_exchange_rate_accounted)",
      dependencies: [
        "meal_allowance",
        "gross_pay_with_exchange_rate_accounted",
      ], //this indicates the components this component is dependent
    },
  ],
  deductions: [
    {
      name: "late penalty", //name of component && should be unique
      identifier: "late_penalty",
      formula: "(0.05 * gross_pay_with_exchange_rate_accounted)", //this could be an amount or a formula referencing other components
      dependencies: ["gross_pay_with_exchange_rate_accounted"],
    },
    {
      name: "tax", //name of component && should be unique
      identifier: "tax",
      formula: "taxPolicy", // run the tax policy
      dependencies: ["taxPolicy"], //this indicates the components this component is dependent
    },
  ],
};
