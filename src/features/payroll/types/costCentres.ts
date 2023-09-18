export type TCostCentre = {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  lastAmountCredited: number;
  totalTransactions: number;
  totalCompletedTransaction: number;
  balance: number;
  totalCredits: number;
  totalDebits: number;
};
export type TSaveCostCentreResponse = {
  message: string;
  data: Data;
};

interface Data {
  costCentre: CostCentre;
  paymentData: PaymentData;
}

interface PaymentData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

interface CostCentre {
  amountPaid: number;
  balance: number;
  id: number;
  name: string;
  label: string;
  amountEntered: number;
  companyId: number;
  updatedAt: string;
  createdAt: string;
}
