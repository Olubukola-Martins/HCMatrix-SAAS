import { TPayrollSchemeType } from "../../payrollSchemes";

export type TPayrollReport = {
  id: number;
  name: string;
  label: string;
  description: string;
  fromDate: string;
  toDate: string;
  templateId: number;
  schemes: TPayrollSchemeType[];
  companyId: number;
  createdAt: string;
  updatedAt: string;
  template: Template;
};

interface Template {
  id: number;
  type: string;
  name: string;
  label: string;
  description: string;
  ytdNet?: any;
  ytdGross?: any;
  ytdTax?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
