export type TResignationPolicy = {
  id: number;
  noticePeriod: number;
  workflowId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  workflow: Workflow;
} | null;

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
