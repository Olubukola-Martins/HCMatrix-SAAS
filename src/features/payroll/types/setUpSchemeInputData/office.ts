import { TAllowanceInput, TDeductionInput } from "../salaryComponents";

export type TOfficeSetupSchemeInputData = {
  name: string;
  type: "office";
  frequency: "monthly";
  allowDisbursement: boolean;
  disbursement: number;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  runAutomatically: boolean;
  automaticRunDay: number;
  allowances: TAllowanceInput[];
  deductions: TDeductionInput[];
};
