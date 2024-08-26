import { TLoanType } from ".";
import { ILoanEmployees } from "./loan";

export type TLoanRepayment = {
  id: number;
  paymentType: string;
  status: string;
  sender: string;
  receiver: string;
  amount: string;
  description: string;
  reference: string;
  payrollId?: any;
  loanId: number;
  employeeId: number;
  empUid: string;
  employee: ILoanEmployees;
  costCentreId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  loan: Loan;
  paymentMethod: string;
  type: TLoanType;
  balance: number;
  disbursedAt: string;
};

interface Loan {
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

// ===== NEW
export interface myLoanRePaymentProps {
  loanId: string;
  loanType: string;
  loanDate: string;
  amount: number;
  disbursedDate: string;
  balance: number;
}

export interface IPaymentPlanDetails {
  loanAmount: string;
  paidAmount: number;
  pendingAmount: number;
  result: IRepaymentPlanColumn[];
  totalCount: number;
}

export interface IRepaymentPlanColumn {
  id: number;
  companyId: number;
  loanId: number;
  principalPayment: string;
  interestPayment: string;
  totalAmount: string;
  remainingBalance: string;
  status: string;
  paidAt: null | string;
  createdAt: string;
  updatedAt: string;
}

export interface IRepaymentPlanChangeStatus {
  paidAt: string;
  scheduleId: number;
  loanId: number;
}