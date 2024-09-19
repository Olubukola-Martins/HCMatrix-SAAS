export type TWalletTransactionAction = "view";
export type TWalletTransactionStatus = "completed" | "pending";
export type TWalletTransactionType = "credit" | "debit";
export type TWalletTransaction = {
  id: number;
  companyId: number;
  provider: string;
  narration?: string;
  balanceBefore: string;
  amount: string;
  fee: string;
  grandTotal: string;
  balanceAfter?: string;
  sender: Sender;
  beneficiary: Sender;
  reference: string;
  providerReference: string;
  employeeId: null;
  empUid: null;
  employeeFullName: null;
  payrollId: null;
  loanId: null;
  deletedAt: null;

  createdAt?: string;
  updatedAt?: string;
  type: TWalletTransactionType;
  status: TWalletTransactionStatus;
};
interface Sender {
  bankCode: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export type TWalletTransactionFilterProps = Partial<{
  type: TWalletTransactionType;
  status: TWalletTransactionStatus;
  date: {
    from: string;
    to: string;
  };
}>;
