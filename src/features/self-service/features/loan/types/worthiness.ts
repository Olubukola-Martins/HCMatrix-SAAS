export interface TLoanWorthiness {
  isWorthy: boolean;
  requiresForm: boolean;
  worthinessMessage: string;
}



export interface ICheckEligibility {
  salary: string;
  loanAmount: number;
  paymentPeriod: PaymentPeriod;
  interest: number;
  deduction: Deduction;
  isEligible: boolean;
  errorMessage: string;
}

interface Deduction {
  percentage: string;
  amount: number;
}

interface PaymentPeriod {
  id: number;
  companyId: number;
  name: string;
  label: string;
  duration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICheckEligibilityProps {
  typeId: number;
  paymentPlanId: number;
  amount: number;
}