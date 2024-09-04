import { TTransactionStatus, TTransactionType } from "../types";
import { TComplianceDocumentType } from "../types/compliance";
import { TPayrollFrequency, TEssentialPayrollType } from "../types/payroll";
import { TPayrollSchemeType } from "../types/payrollSchemes";
import {
  TWalletTransactionStatus,
  TWalletTransactionType,
} from "../types/payrollWallet";

export const WALLET_COMPLIANCE_DOCUMENT_TYPES: TComplianceDocumentType[] = [
  "cac-2",
  "cac-7",
  "certificate-of-incorporation",
  "memorandum-of-incorporation",
];

export const DEFAULT_PENSION_ADMINISTRATORS = [
  "Access Pensions Limited",
  "ARM Pension Managers Limited",
  "Crusader Sterling Pensions Limited",
  "FCMB Pensions Limited",
  "Guaranty Trust Pension Managers Limited",
  "Leadway Pensure PFA Limited",
  "Nigerian University Pension Management Company (NUPEMCO)",
  "NLPC Pension Fund Administrators Limited",
  "Norrenberger Pensions Limited",
  "NPF Pensions Fund Administrators Limited",
  "OAK Pensions Limited",
  "Pensions Alliance Limited",
  "Premium Pension Limited",
  "Radix Pension Managers Limited",
  "Stanbic IBTC Pension Managers Limited",
  "Tangerine APT Pensions Limited",
  "Trustfund Pensions Limited",
  "Veritas Glanvills Pensions Limited",
];
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
    label: "Step Pay",
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
    label: "Step Pay",
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

export const WALLET_TRANSACTION_TYPES: TWalletTransactionType[] = [
  "credit",
  "debit",
];
export const WALLET_TRANSACTION_STATUSES: TWalletTransactionStatus[] = [
  "completed",
  "pending",
];
