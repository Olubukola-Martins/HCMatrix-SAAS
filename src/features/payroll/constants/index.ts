export const ALLOWANNCES = [
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
    dependencies: ["meal_allowance", "gross_pay_with_exchange_rate_accounted"], //this indicates the components this component is dependent
  },
];
