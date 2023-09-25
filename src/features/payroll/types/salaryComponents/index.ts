import { TSalaryComponent } from "./data";
import {
  TDeductionInput,
  TAllowanceInput,
  TSalaryComponentInput,
} from "./input";

export {
  type TDeductionInput,
  type TAllowanceInput,
  type TSalaryComponent,
  type TSalaryComponentInput,
};
export type TSalaryComponentCalculationMode =
  | "percentage"
  | "formula"
  | "fixed"
  | "formula";
