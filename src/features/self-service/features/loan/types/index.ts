import { TLoanSetting } from "./setting";
import { TLoanRequest, TLoanRequestStatus } from "./request";
import { TLoanAnalytics } from "./analytic";
import { TLoanRepayment } from "./repayment";
import { TLoan } from "./loan";
import { TLoanWorthiness } from "./worthiness";

type TLoanType = {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
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
  type TLoanAnalytics,
  type TLoanRepayment,
  type TLoan,
  type TLoanWorthiness,
};
