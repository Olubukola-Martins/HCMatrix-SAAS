import {
  TAllowanceInput,
  TDeductionInput,
  TSalaryComponentInput,
} from "../salaryComponents";

export type TOfficeSetupSchemeInputData = {
  name: string;
  type: "office";
  frequency: "monthly";
  allowDisbursement: boolean;
  disbursement: number;
  allowApproval: boolean;
  workflowId: number;
  costCentreId: number;
  issuePayslip: boolean;
  runAutomatically: boolean;
  automaticRunDay: number;
  salaryComponents: TSalaryComponentInput[];
};
