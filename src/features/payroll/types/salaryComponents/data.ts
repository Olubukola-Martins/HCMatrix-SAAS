export type TSalaryComponent = {
  id: number;
  schemeId: number;
  name: string;
  label: string;
  type: "allowance" | "deduction";
  mode: "fixed" | "percentage" | "formula";
  isDefault?: boolean;
  isActive?: boolean;
  description?: string;
  amount: number | string;
  createdAt: string;
  updatedAt: string;
  shouldDisplayOnReviewTable: boolean;
};
