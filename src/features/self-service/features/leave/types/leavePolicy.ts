export interface TLeavePolicy {
  id: number;
  defaultLength: number;
  workflowId: number;
  includeWeekends: boolean;
  includeHolidays: boolean;
  carryover: boolean;
  maxLengthCarryover: number;
  casualLeave: boolean;
  casualLeaveLength: number;
  probationersApply: boolean;
  probationersUseCasualLeave: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  workflow: Workflow;
}

interface Workflow {
  id: number;
  name: string;
  label: string;
  lastModifiedById: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
