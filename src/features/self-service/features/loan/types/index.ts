import { TLoanSetting } from "./setting";
import { TLoanRequest, TLoanRequestStatus } from "./request";
import { TLoanRepayment } from "./repayment";
import { TLoan } from "./loan";
import { TLoanWorthiness } from "./worthiness";

type TLoanType = {
  id: number;
  name: string;
  hasInterest: boolean;
  interestRate: number;
};

type TPaymentPlan = {
  id: number;
  name: string;
  label: string;
  duration: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

export {
  type TLoanSetting,
  type TLoanType,
  type TPaymentPlan,
  type TLoanRequest,
  type TLoanRequestStatus,
  type TLoanRepayment,
  type TLoan,
  type TLoanWorthiness,
};

export interface IDisburseLoanProps {
  disbursedAt: string;
  id: number;
}
