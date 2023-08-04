export type TSinglePayroll = {
  id: number;
  schemeId: number;
  name: string;
  label: string;
  date: string;
  description: string;
  frequency: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employeePayrolls: EmployeePayroll[];
};

interface EmployeePayroll {
  id: number;
  payrollId: number;
  employeeId: number;
  eligibility: string;
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
  isFromScheme: boolean;
  isActive: boolean;
  amount: string;
  calculatedAmount: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
