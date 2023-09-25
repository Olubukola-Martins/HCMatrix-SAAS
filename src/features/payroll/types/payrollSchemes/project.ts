export type TProjectPayrollScheme = {
  id: number;
  name: string;
  type: "project";
  frequency: number;
  allowDisbursement: boolean;
  disbursement?: any;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  projectId: number;
  runAutomatically: boolean;
  automaticRunDay: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}[];
