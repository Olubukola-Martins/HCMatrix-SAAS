import { TEmployeesInPayrollData } from "./employee/employeesInPayroll";
import { TSingleEmployeePayroll } from "./employee/singleEmployeePayroll";
import { TSinglePayroll } from "./singlePayroll";

export {
  type TSinglePayroll,
  type TSingleEmployeePayroll,
  type TEmployeesInPayrollData,
  type TPayrollListData,
};

interface TPayrollListData {
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
  scheme: Scheme;
}

interface Scheme {
  id: number;
  name: string;
  type: string;
  frequency: string;
  allowDisbursement: boolean;
  disbursement: number;
  costCentreId?: any;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  projectId?: any;
  runAutomatically: boolean;
  automaticRunDay: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
