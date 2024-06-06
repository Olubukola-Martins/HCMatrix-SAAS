export type TDeductionInput = TSalaryComponentInput;
export type TAllowanceInput = TSalaryComponentInput;

export type TSalaryComponentInput = {
  type: "allowance" | "deduction";
  name: string;
  label: string;
  mode: "fixed" | "percentage" | "formula";
  amount: number | string;
  description?: string;
  isDefault?: boolean;
  isActive?: boolean;
  shouldDisplayOnReviewTable: boolean;
};
