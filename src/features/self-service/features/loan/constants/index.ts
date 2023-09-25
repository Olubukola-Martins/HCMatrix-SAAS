import { TLoanRequestStatus } from "../types";

const LOAN_STATUSES: TLoanRequestStatus[] = [
  "pending",
  "approved",
  "rejected",
  "disbursed",
  "repayment-in-process",
  "repaid",
];

export const LOAN_STATUS_OPTIONS: {
  value: TLoanRequestStatus;
  label: string;
}[] = LOAN_STATUSES.map((item) => ({
  label: item.split("-").join(" "),
  value: item,
}));
