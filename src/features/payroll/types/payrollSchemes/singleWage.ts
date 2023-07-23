export type TSingleWagePayrollScheme = {
  id: number;
  name: string;
  type: "wages";
  frequency: "monthly" | "daily";
  allowDisbursement: boolean;
  disbursement?: any;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  projectId?: any;
  runAutomatically: boolean;
  automaticRunDay: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
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
