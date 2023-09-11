export type TCostCentre = {
  id: number;
  name: string;
  label: string;
  amountEntered: string;
  amountPaid: string;
  balance: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
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
