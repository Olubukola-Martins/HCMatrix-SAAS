import { TProjectPayrollScheme } from "./project";

export type TSingleProjectPayrollScheme = TProjectPayrollScheme[0] & {
  allowances: SalaryComponent[];
  deductions: SalaryComponent[];
  workflow: Workflow;
};

interface Workflow {
  id: number;
  name: string;
  label: string;
  type: string;
  companyId: number;
}

type SalaryComponent =
  | {
      id: number;
      schemeId: number;
      name: string;
      label: string;
      mode: "fixed" | "percentage";
      isDefault?: boolean;
      isActive?: boolean;
      amount: number;
      createdAt: string;
      updatedAt: string;
    }
  | {
      id: number;
      schemeId: number;
      name: string;
      label: string;
      mode: "formula";
      isDefault?: boolean;
      isActive?: boolean;
      amount: string;
      createdAt: string;
      updatedAt: string;
    };
