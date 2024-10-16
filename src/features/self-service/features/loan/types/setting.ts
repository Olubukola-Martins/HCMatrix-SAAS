export type TLoanSetting = {
  id: number;
  workflowId: number;
  costCentreId: number;
  maxLoanPercentage: number;
  cannotExceedMaxLoanPercentage: boolean;
  shouldFillGuarantorsForm: boolean;
  maxAllowedLoanApplications: number;
  maxLoansDuringRepayment: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  costCentre: CostCentre;
  workflow: Workflow;
};

interface Workflow {
  id: number;
  name: string;
  label: string;
  type: string;
  companyId: number;
}

interface CostCentre {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
