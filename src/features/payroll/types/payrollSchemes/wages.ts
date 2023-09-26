export type TWagesPayrollScheme = {
  id: number;
  name: string;
  type: "wages";
  frequency: "monthly" | "daily";
  allowDisbursement: boolean;
  disbursement?: any;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  projectId?: any;
  runAutomatically: boolean;
  automaticRunDay: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}[];
