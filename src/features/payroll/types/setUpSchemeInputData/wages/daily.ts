import { TAllowanceInput, TDeductionInput } from "../../salaryComponents";

export type TDailyWagesSetupSchemeInputData = {
  name: string;
  type: "wages";
  frequency: "daily";
  allowDisbursement: boolean;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  runAutomatically: boolean;
  automaticRunDay: number;
  allowances: TAllowanceInput[];
  deductions: TDeductionInput[];
};
