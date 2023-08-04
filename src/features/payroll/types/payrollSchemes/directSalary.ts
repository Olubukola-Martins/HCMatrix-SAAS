export type TDirectSalaryPayrollScheme = {
  id: number;
  name: string;
  type: "direct-salary";
  frequency: "monthly";
  allowDisbursement: boolean;
  disbursement: number;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  projectId?: any;
  runAutomatically: boolean;
  automaticRunDay: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
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
