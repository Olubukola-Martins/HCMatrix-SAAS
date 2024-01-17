import { TEmployeesInPayrollData } from "./employee/employeesInPayroll";

export type TSinglePayroll = {
  id: number;
  schemeId: number;
  name: string;
  label: string;
  date: string;
  disbursementDate?: string;
  description: string;
  frequency: string;
  status:
    | "draft"
    | "in-review"
    | "approved"
    | "rejected"
    | "in-disbursement"
    | "awaiting-disbursement"
    | "confirmed";
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employeePayrolls: TEmployeesInPayrollData[];
  costCentre: CostCentre;

  totalAllowances: number;
  totalDeductions: number;
  totalNetPay: number;
  totalGrossPay: number;
  totalTax: number;

  costCentreId: number;

  scheme: Scheme;
};

interface CostCentre {
  id: number;
  name: string;
  label: string;
  amountEntered: string;
  amountPaid: string;
  balance: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Scheme {
  id: number;
  name: string;
  type: string;
  frequency: string;
  allowDisbursement: boolean;
  disbursement: number;
  costCentreId: number;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  projectId?: any;
  runAutomatically: boolean;
  automaticRunDay?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
