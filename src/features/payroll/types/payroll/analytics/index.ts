export type TPayrollGraphAnalyticsItemType =
  | "bar-chart"
  | "line-chart"
  | "scatter-chart"
  | "waterfall-chart"
  | "pie-chart"
  | "histogram"
  | "area-graph"
  | "spider-chart";
export type TPayrollGraphTabItem =
  | "Net Pay"
  | "Gross Pay"
  | "Tax"
  | "Pension"
  | "Total Deductions"
  | "Total Allowances";
export type TPayrollGraphAnalyticsItem = {
  totalNetPay: ObjectItem;
  totalGrossPay: ObjectItem;
  totalTax: ObjectItem;
  totalPension: ObjectItem;
  totalAllowances: ObjectItem;
  totalDeductions: ObjectItem;
};
export type TPayrollAnalyticsItem = {
  employeeCount: number;
  reviewPayroll: ReviewPayroll;
};

interface ReviewPayroll {
  totalCount: number;
  totalPay: number;
}
export type TPayrollGraphAnalyticsItem4Waterfall = {
  [key: string]: {
    [key: string]: {
      totalNetPay: number;
      totalGrossPay: number;
      totalTax: number;
      totalPension: number;
      totalAllowances: number;
      totalDeductions: number;
    };
  };
};

type ObjectItem = { [key: string]: number };
