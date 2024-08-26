import { TLicenseType } from "features/authentication/types/auth-user";
import { TLoanType } from ".";
import { TConfirmApprovalActionProps } from "hooks/useApproveORReject";

export type TLoanRequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "disbursed"
  | "repayment-in-process"
  | "repaid";

export type TLoanRequest = {
  balance: number;
  id: number;
  date: string;
  description: string;
  typeId: number;
  paymentPlanId: number;
  amount: string;
  employeeId: number;
  status: string;
  documentUrl?: string[];
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  disbursedAt?: string;
  type: Type;
  paymentPlan: PaymentPlan;
  employee: Employee;
  loanEligibility?: string;
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

export interface PaymentPlan {
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

// ======= new
export interface myLoanRequestProps {
  id: number;
  loanId: string;
  requestDate: string;
  type: TLoanType;
  date: string;
  amount: number;
  disbursedAt: string;
  status: string;
  createdAt: string;
}

export interface EmployeeLoanRequestTableActions {
  handleLoanTypeDelete?: (id: number) => void;
  handleLoanDetails: (id: number) => void;
  handleLoanDisbursement?: (id: number) => void;
  confirmApprovalAction?: (val: TConfirmApprovalActionProps) => void;
  handleLoanApprovalStages?: (id: number) => void;
  handleGetRepaymentPlan?: (id: number) => void;
}
