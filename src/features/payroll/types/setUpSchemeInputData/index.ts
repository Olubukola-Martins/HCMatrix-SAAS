import { TDirectSalarySetupSchemeInputData } from "./directSalary";
import { TOfficeSetupSchemeInputData } from "./office";
import { TProjectSetupSchemeInputData } from "./project";
import { TDailyWagesSetupSchemeInputData } from "./wages/daily";
import { TMonthlyWagesSetupSchemeInputData } from "./wages/monthly";

export type TSetupPayrollSchemeData =
  | TOfficeSetupSchemeInputData
  | TDirectSalarySetupSchemeInputData
  | TProjectSetupSchemeInputData
  | TDailyWagesSetupSchemeInputData
  | TMonthlyWagesSetupSchemeInputData;
