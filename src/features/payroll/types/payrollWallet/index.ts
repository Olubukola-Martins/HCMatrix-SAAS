export type TWalletTransactionAction = "view";
export type TWalletTransactionStatus = "completed" | "pending";
export type TWalletTransactionType = "credit" | "debit";
export type TWalletTransaction = {
  createdAt?: string;
  updatedAt?: string;
  narration?: string;
  amount?: number;
  type: TWalletTransactionType;
  balance?: number;
  status: TWalletTransactionStatus;
};

export type TWalletTransactionFilterProps = Partial<{
  type: TWalletTransactionType;
  status: TWalletTransactionStatus;
  date: {
    from: string;
    to: string;
  };
}>;
