import { TEmployeesInPayrollData } from "./employee/employeesInPayroll";

export type TSinglePayroll = {
  id: number;
  schemeId: number;
  name: string;
  label: string;
  date: string;
  description: string;
  frequency: string;
  status:
    | "draft"
    | "in-review"
    | "approved"
    | "rejected"
    | "in-disbursement"
    | "confirmed";
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employeePayrolls: TEmployeesInPayrollData[];
  costCentre: CostCentre;
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
