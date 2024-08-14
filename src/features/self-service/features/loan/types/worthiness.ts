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
  name: string;
  label: string;
}

export interface ICheckEligibilityParams {
  typeId: number;
  paymentPlanId: number;
  amount: number;
}