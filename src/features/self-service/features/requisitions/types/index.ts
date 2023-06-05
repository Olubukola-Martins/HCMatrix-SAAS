export type TRequistionType =
  | "asset"
  | "job"
  | "money"
  | "position-change"
  | "promotion"
  | "reimbursement"
  | "transfer";

export interface TRequisitionSetting {
  id: number;
  type: TRequistionType;
  isActive: boolean;
  workflowId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  workflow: Workflow;
}

interface Workflow {
  id: number;
  name: string;
  label: string;
  type: string;
  lastModifiedById: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
