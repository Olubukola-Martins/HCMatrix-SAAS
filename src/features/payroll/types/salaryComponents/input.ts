export type TDeductionInput = TSalaryComponentInput;
export type TAllowanceInput = TSalaryComponentInput;

export type TSalaryComponentInput =
  | {
      name: string;
      label: string;
      mode: "fixed" | "percentage";
      amount: number;
      isDefault?: boolean;
      isActive?: boolean;
    }
  | {
      name: string;
      label: string;
      mode: "formula";
      amount: string;
      isDefault?: boolean;
      isActive?: boolean;
    };
