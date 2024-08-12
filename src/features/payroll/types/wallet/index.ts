import { TPayrollGraphAnalyticsItem } from "../payroll";

export type TPayrollWalletPaymentProvider = "Korapay" | "Providus";
export type TWalletTransactionStatus = "completed" | "pending";
export type TWalletTransactionType = "credit" | "debit";
export type TPayrollWalletTransaction = {
  createdAt?: string;
  updatedAt?: string;
  narration?: string;
  amount?: number;
  type: TWalletTransactionType;
  provider: TPayrollWalletPaymentProvider;
  balance?: number;
  status: TWalletTransactionStatus;
};
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
  graphData: GraphData;
};

type GraphData = TPayrollGraphAnalyticsItem;
// type GraphData = Record<string, number>;

interface Balance {
  providus: number;
  wema: number;
}
