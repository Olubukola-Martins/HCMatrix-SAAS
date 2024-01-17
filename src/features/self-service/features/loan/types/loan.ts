import { TLicenseType } from "features/authentication/types/auth-user";

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
  type: Type;
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

interface PaymentPlan {
  id: number;
  name: string;
  label: string;
  duration: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Type {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
