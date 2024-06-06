export interface TSingleEmployeePayroll {
  id: number;
  payrollId: number;
  employeeId: number;
  empUid: string;
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

  // added new types
  email: string;

  gender: string;

  leaveAllowance: string;
  itf: string;
  nsitf: string;
  overtime: string;
  pension: string;
  thirteenthMonthSalary: string;
  costCentre: string;

  exchangeRate: string;
  ytdNet: string;
  ytdGross: string;
  ytdTax: string;
  phoneNumber: string;
  branch: string;
  department: string;
  designation: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
  recipientCode?: any;
  hourlyRate?: any;
  hoursCompleted: number;
  itfAuthority: string;
  itfId: string;
  nin: string;
  nsitfAuthority: string;
  nsitfId: string;
  pensionAdministrator: string;
  pensionId: string;
  taxAuthorityName: string;
  taxId: string;
  payrollType: string;
  confirmedAt: string;
}

interface EmployeeSalaryComponent {
  id: number;
  payrollEmployeeId: number;
  type: string;
  name: string;
  label: string;
  mode: string;
  isActive: boolean;
  isLoan: boolean;
  loanId?: any;
  amount: string;
  calculatedAmount: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
///
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
