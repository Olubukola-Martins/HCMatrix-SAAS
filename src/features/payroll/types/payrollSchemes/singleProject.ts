import { TProjectPayrollScheme } from "./project";

export type TSingleProjectPayrollScheme = TProjectPayrollScheme[0] & {
  salaryComponents: SalaryComponent[];

  workflow: Workflow;
  costCentreId?: number;
};

interface Workflow {
  id: number;
  name: string;
  label: string;
  type: string;
  companyId: number;
}

type SalaryComponent = {
  id: number;
  schemeId: number;
  name: string;
  label: string;
  type: "allowance" | "deduction";
  mode: "fixed" | "percentage" | "formula";
  isDefault?: boolean;
  isActive?: boolean;
  amount: number | string;
  createdAt: string;
  updatedAt: string;
};
