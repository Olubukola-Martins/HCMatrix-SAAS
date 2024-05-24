import {
  TPayrollAnalyticsItem,
  TPayrollGraphAnalyticsItem,
  TPayrollGraphAnalyticsItemType,
  TPayrollGraphTabItem,
} from "./analytics";
import { TEmployeesInPayrollData } from "./employee/employeesInPayroll";
import { TSingleEmployeePayroll } from "./employee/singleEmployeePayroll";
import { TSinglePayroll } from "./singlePayroll";

type TPayrollFrequency = "daily" | "monthly";
type TEssentialPayrollType = "direct-salary" | "office" | "wages";

export {
  type TEssentialPayrollType,
  type TPayrollFrequency,
  type TSinglePayroll,
  type TSingleEmployeePayroll,
  type TEmployeesInPayrollData,
  type TPayrollListData,
  type TPayrollGraphAnalyticsItemType,
  type TPayrollGraphAnalyticsItem,
  type TPayrollAnalyticsItem,
  type TPayrollGraphTabItem,
};

interface TPayrollListData {
  totalAllowances: number;
  totalDeductions: number;
  totalNetPay: number;
  totalGrossPay: number;
  totalTax: number;
  id: number;
  schemeId: number;
  name: string;
  label: string;
  date: string;
  description: string;
  frequency: string;
  status: string;
  costCentreId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  disbursementDate?: string;
  scheme: Scheme;
  componentsToDisplay?: Record<string, number> | null;

  employeePayrolls?: TEmployeesInPayrollData[];
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
  projectId?: number;
  runAutomatically: boolean;
  automaticRunDay: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
