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

  carryoverMonth: number; // min: 0, max: 11. required if carry over is set to true
  carryoverDay: number; // min: 1, max: 31 (depending on the month) required if carryover is set to true
  proration: boolean;
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
