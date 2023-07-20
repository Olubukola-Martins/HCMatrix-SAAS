import { TDirectSalaryPayrollScheme } from "./directSalary";
import { TOfficePayrollScheme } from "./office";
import { TProjectPayrollScheme } from "./project";
import { TSingleProjectPayrollScheme } from "./singleProject";
import { TSingleWagePayrollScheme } from "./singleWage";
import { TWagesPayrollScheme } from "./wages";

export type TPayrollScheme =
  | TDirectSalaryPayrollScheme
  | TOfficePayrollScheme
  | TWagesPayrollScheme
  | TSingleWagePayrollScheme
  | TProjectPayrollScheme
  | TSingleProjectPayrollScheme;

export type TPayrollSchemeType =
  | "office"
  | "direct-salary"
  | "wages"
  | "project";
