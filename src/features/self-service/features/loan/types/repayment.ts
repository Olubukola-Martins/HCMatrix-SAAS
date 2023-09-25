export type TLoanRepayment = {
  id: number;
  type: string;
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
  employeeFullName: string;
  costCentreId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  loan: Loan;
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
