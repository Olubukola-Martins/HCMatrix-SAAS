import { TApprovalStatus } from "types/statuses";
import { TLoanSetting } from "./setting";

export type TLoan = any;
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

export type TLoanStatus = TApprovalStatus | "repaid" | "processing";

export { type TLoanSetting, type TLoanType, type TPaymentPlan };
