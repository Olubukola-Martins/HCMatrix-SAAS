import { WALLET_PAYMENT_PROVIDERS } from "features/payroll/constants";
import { TWalletTransaction } from "../payrollWallet";

export type TPayrollWalletPaymentProvider =
  (typeof WALLET_PAYMENT_PROVIDERS)[number];
export type TWalletTransactionStatus = "completed" | "pending";
export type TWalletTransactionType = "credit" | "debit";
export type TPayrollWalletTransaction = TWalletTransaction;
export type TPayrollWallet = {
  id: number;
  companyId: number;
  provider: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};

export type TPayrollWalletDashboardAnalytics = {
  balance: Balance;
  lastFundedAmount: number;
  totalTransactions: number;
  totalDebit: number;
  totalCredit: number;
  graphData: Record<string, number>;
};

type Balance = Record<TPayrollWalletPaymentProvider, number>;
