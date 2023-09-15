import { TTransactionStatus, TTransactionType } from "../types";
import { TPayrollSchemeType } from "../types/payrollSchemes";

const PAYROLL_SCHEMES: TPayrollSchemeType[] = [
  "direct-salary",
  "office",
  "project",
  "wages",
];
export const PAYROLL_SCHEME_OPTIONS: {
  value: TPayrollSchemeType;
  label: string;
}[] = PAYROLL_SCHEMES.map((item) => ({
  label: item.split("-").join(" "),
  value: item,
}));

const TRANSACTION_STATUSES: TTransactionStatus[] = [
  "processing",
  "failed",
  "cancelled",
  "completed",
];

export const TRANSACTION_STATUS_OPTIONS: {
  value: TTransactionStatus;
  label: string;
}[] = TRANSACTION_STATUSES.map((item) => ({ label: item, value: item }));

const TRANSACTION_TYPES: TTransactionType[] = ["credit", "debit"];

export const TRANSACTION_TYPE_OPTIONS: {
  value: TTransactionType;
  label: string;
}[] = TRANSACTION_TYPES.map((item) => ({ label: item, value: item }));
