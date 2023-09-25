import { TAllowanceInput, TDeductionInput } from "../salaryComponents";

export type TProjectSetupSchemeInputData = {
  name: string;
  type: "project";
  projectId: number;
  frequency: number;
  allowDisbursement: boolean;
  allowApproval: boolean;
  workflowId: number;
  issuePayslip: boolean;
  runAutomatically: boolean;
  automaticRunDay: string; //{\"1-Payment\": \"2023-07-27\",\"2-Payment\": \"2023-10-27\",\"3-Payment\": \"2024-02-01\"}
  allowances: TAllowanceInput[];
  deductions: TDeductionInput[];

  projectParticipants: ProjectParticipant[];
};

interface ProjectParticipant {
  employeeId: number;
  grossPay: number;
}
