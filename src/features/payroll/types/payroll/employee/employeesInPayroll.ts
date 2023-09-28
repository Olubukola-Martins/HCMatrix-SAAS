import { TEmploymentEligibity } from "types/employementEligibilities";

export interface TEmployeesInPayrollData {
  id: number;
  payrollId: number;
  employeeId: number;
  empUid: string;
  eligibility: TEmploymentEligibity;
  fullName: string;
  netPay: string;
  grossPay: string;
  totalAllowances: string;
  totalDeductions: string;
  tax: string;
  currency: string;
  rate: string;
  isActive: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employeeSalaryComponents: EmployeeSalaryComponent[];
}

interface EmployeeSalaryComponent {
  id: number;
  payrollEmployeeId: number;
  type: string;
  name: string;
  label: string;
  mode: string;
  isLoan: boolean;
  isActive: boolean;
  amount: string;
  calculatedAmount: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
