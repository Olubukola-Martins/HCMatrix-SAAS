import { TPayrollSchemeType } from "../payrollSchemes";
import { TSalaryComponentInput } from "../salaryComponents";
// import { TDirectSalarySetupSchemeInputData } from "./directSalary";
// import { TOfficeSetupSchemeInputData } from "./office";
// import { TProjectSetupSchemeInputData } from "./project";
// import { TDailyWagesSetupSchemeInputData } from "./wages/daily";
// import { TMonthlyWagesSetupSchemeInputData } from "./wages/monthly";

// export type TSetupPayrollSchemeData =
//   | TOfficeSetupSchemeInputData
//   | TDirectSalarySetupSchemeInputData
//   | TProjectSetupSchemeInputData
//   | TDailyWagesSetupSchemeInputData
//   | TMonthlyWagesSetupSchemeInputData;
export type TSetupPayrollSchemeData = {
  name: string;
  type: TPayrollSchemeType;
  projectId?: number;
  frequency: number | "monthly" | "daily";
  allowDisbursement: boolean;
  allowApproval: boolean;
  workflowId: number;
  costCentreId?: number;
  issuePayslip: boolean;
  runAutomatically: boolean;
  automaticRunDay: string | number; //{\"1-Payment\": \"2023-07-27\",\"2-Payment\": \"2023-10-27\",\"3-Payment\": \"2024-02-01\"} OR day of month
  salaryComponents: TSalaryComponentInput[];

  projectParticipants?: ProjectParticipant[];
};

interface ProjectParticipant {
  employeeId: number;
  grossPay: number;
}
