export interface TLeavePolicy {
  id: number;
  workflowId: number;
  includeWeekends: boolean;
  includeHolidays: boolean;
  carryover: boolean;
  maxLengthCarryover: number;
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
