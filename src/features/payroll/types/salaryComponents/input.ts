export type TDeductionInput = TSalaryComponentInput;
export type TAllowanceInput = TSalaryComponentInput;

export type TSalaryComponentInput = {
  type: "allowance" | "deduction";
  name: string;
  label: string;
  mode: "fixed" | "percentage" | "formula";
  amount: number | string;
  isDefault?: boolean;
  isActive?: boolean;
};
