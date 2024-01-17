import { TTransactionStatus, TTransactionType } from "../types";
import { TPayrollFrequency, TEssentialPayrollType } from "../types/payroll";
import { TPayrollSchemeType } from "../types/payrollSchemes";

export const PAYROLL_FREQUENCIES: TPayrollFrequency[] = ["daily", "monthly"];
export const ESSENTIAL_PAYROLL_TYPES: TEssentialPayrollType[] = [
  "direct-salary",
  "office",
  "wages",
];
export const PAYROLL_FREQUENCIES_OPTIONS = PAYROLL_FREQUENCIES.map((item) => ({
  label: <span className="capitalize">{item.split("-").join(" ")}</span>,
  value: item,
}));
export const ESSENTIAL_PAYROLL_TYPES_OPTIONS = [
  {
    label: "Direct Salary",
    value: "direct-salary",
  },
  {
    label: "Set Pay",
    value: "office",
  },
  {
    label: "Wages",
    value: "wages",
  },
];

export const PAYROLL_SCHEME_OPTIONS: {
  value: TPayrollSchemeType;
  label: string;
}[] = [
  {
    label: "Direct Salary",
    value: "direct-salary",
  },
  {
    label: "Set Pay",
    value: "office",
  },
  {
    label: "Wages",
    value: "wages",
  },
  {
    label: "Project",
    value: "project",
  },
];

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
