import { TLicenseType } from "features/authentication/types/auth-user";
import { TLoanType } from ".";
import { PaymentPlan } from "./request";

export type TLoan = {
  balance: number;
  id: number;
  title: string;
  date: string;
  description: string;
  typeId: number;
  paymentPlanId: number;
  amount: string;
  employeeId: number;
  status: string;
  guarantorFormUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  type: TLoanType;
  paymentPlan: PaymentPlan;
  employee: Employee;
};

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  licenseType: TLicenseType;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl: string;
  designation: Designation;
  finance: Finance[];
}

interface Finance {
  id: number;
  employeeId: number;
  key: string;
  value: Value;
  companyId: number;
}

interface Value {
  bvn: string;
  bankCode: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

interface Designation {
  id: number;
  name: string;
  label: string;
  departmentId: number;
  companyId: number;
  department: Department;
}

interface Department {
  id: number;
  name: string;
  label: string;
  companyId: number;
  email: string;
}

//=== New

export interface ILoanEmployees {
  firstName: string;
  lastName: string;
  empUid: string;
  designation: {
    department: {
      name: string;
    };
  };
}

export interface AllLoanRequestProps {
  id: number;
  requestDate: string;
  employee: ILoanEmployees;
  department: {
    name: string;
  };
  type: TLoanType;
  date: string;
  balance: number;
  amount: number;
  createdAt: string;
  status: string;
  disbursedAt: string;
  paymentPlan: PaymentPlan;
}

export interface ILoanDetails {
  id: number;
  date: string;
  amount: string;
  status: string;
  description: string;
  documentUrl: string;
  disbursedAt: null;
  amountToRepay: string;
  type: TLoanType;
  paymentPlan: PaymentPlan;
  employee: ILoanEmployees;
}
