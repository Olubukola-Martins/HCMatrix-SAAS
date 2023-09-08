import { TLoanStatus } from "../types";

const LOAN_STATUSES: TLoanStatus[] = [
  "approved",
  "rejected",
  "processing",
  "repaid",
];

export const LOAN_STATUS_OPTIONS: { value: TLoanStatus; label: string }[] =
  LOAN_STATUSES.map((item) => ({ label: item, value: item }));
