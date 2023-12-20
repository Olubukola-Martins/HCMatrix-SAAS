import { TTaxCondition } from "features/payroll/utils/createTaxSalaryComponentFormula";

export type TTaxConfig = {
  taxableIncome: string;
  divisor: number;
  conditions: TTaxCondition[];
};
