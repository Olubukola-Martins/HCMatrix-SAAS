import { TProjectPayrollScheme } from "./project";

export type TSingleProjectPayrollScheme = TProjectPayrollScheme[0] & {
  salaryComponents: SalaryComponent[];

  workflow: Workflow;
  costCentreId?: number;
  projectParticipants: ProjectParticipant[];
};

interface ProjectParticipant {
  id: number;
  schemeId: number;
  employeeId: number;
  grossPay: string;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  userId: number;
  personalInformation: PersonalInformation;
}

interface PersonalInformation {
  eligibility: string;
  exchangeRateId: number;
  exchangeRate: ExchangeRate;
}

interface ExchangeRate {
  id: number;
  currency: string;
  label: string;
  rate: number;
  companyId: number;
}

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
