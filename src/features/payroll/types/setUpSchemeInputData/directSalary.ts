import { TAllowanceInput, TDeductionInput } from "../salaryComponents";

export type TDirectSalarySetupSchemeInputData = {
  name: string;
  type: "direct-salary";
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
