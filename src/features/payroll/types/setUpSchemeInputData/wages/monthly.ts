import { TAllowanceInput, TDeductionInput } from "../../salaryComponents";

export type TMonthlyWagesSetupSchemeInputData = {
  name: string;
  type: "wages";
  frequency: "monthly";
  allowDisbursement: boolean;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  runAutomatically: boolean;
  automaticRunDay: number;
  allowances: TAllowanceInput[];
  deductions: TDeductionInput[];
};
