export type TProbationPolicy = {
  id: number;
  duration: number;
  workflowId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  workflow: Workflow;
};

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
