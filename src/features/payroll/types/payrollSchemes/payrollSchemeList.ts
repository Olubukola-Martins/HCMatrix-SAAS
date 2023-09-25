export type TPayrollSchemeListItem = {
  id: number;
  name: string;
  type: "wages" | "direct-salary" | "office" | "project";
  frequency: "monthly" | "daily" | number;
  allowDisbursement: boolean;
  disbursement: number;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  projectId?: any;
  runAutomatically: boolean;
  automaticRunDay: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};
