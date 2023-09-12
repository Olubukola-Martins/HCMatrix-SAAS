export type TPayrollTemplateInfoType = "employee" | "payroll";
export type TPayrollTemplateType = "payslip" | "payroll";

export type TPayrollTemplateInfo = {
  id: number;
  type: TPayrollTemplateInfoType;
  name: string;
  label: string;
  createdAt: string;
  updatedAt: string;
};

export type TPayrollTemplate = {
  id: number;
  type: TPayrollTemplateType;
  name: string;
  label: string;
  description: string;
  ytdNet?: boolean;
  ytdGross?: boolean;
  ytdTax?: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;

  employeeInformation: EmployeeInformation[];
  payrollInformation: EmployeeInformation[];
};

interface EmployeeInformation {
  id: number;
  templateId: number;
  templateInformationId: number;
  createdAt: string;
  updatedAt: string;
  templateInformation: TemplateInformation;
}

interface TemplateInformation {
  id: number;
  type: string;
  name: string;
  label: string;
  createdAt: string;
  updatedAt: string;
}
