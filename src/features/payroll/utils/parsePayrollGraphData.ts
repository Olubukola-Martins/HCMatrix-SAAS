import {
    TPayrollGraphAnalyticsFormattedData,
  TPayrollGraphAnalyticsItem,
  TPayrollGraphAnalyticsItem4Waterfall,
  TPayrollGraphAnalyticsItemType,
  TPayrollGraphTabItem,
} from "features/payroll/types/payroll/analytics";

type TParseData = {
  labels: string[];
  data: {
    totalNetPay: number[] | number[][];
    totalGrossPay: number[] | number[][];
    totalTax: number[] | number[][];
    totalPension: number[] | number[][];
    totalAllowances: number[] | number[][];
    totalDeductions: number[] | number[][];
  };
};
export const parsePayrollGraphAnalyticsData = (props: {
  data?: TPayrollGraphAnalyticsItem4Waterfall | TPayrollGraphAnalyticsItem;
  chartItem: TPayrollGraphAnalyticsItemType;
}): TParseData => {
  const { data, chartItem } = props;
  let value: TParseData = {
    labels: [],
    data: {
      totalNetPay: [],
      totalGrossPay: [],
      totalTax: [],
      totalPension: [],
      totalAllowances: [],
      totalDeductions: [],
    },
  };
  console.log("first");
  if (!data) return value;

  if (chartItem === "waterfall-chart") {
    value.labels = Object.keys(data as TPayrollGraphAnalyticsItem4Waterfall);
    value.data.totalNetPay = Object.entries(
      data as TPayrollGraphAnalyticsItem4Waterfall
    ).map(([key, value]) => {
      let ans: number[] = [];
      Object.entries(value).forEach(([innerkey, innerVal]) =>
        ans.push(innerVal.totalNetPay)
      );
      return ans;
    });
    console.log("last", value);
    value.data.totalGrossPay = Object.entries(
      data as TPayrollGraphAnalyticsItem4Waterfall
    ).map(([key, value]) => {
      let ans: number[] = [];
      Object.entries(value).forEach(([innerkey, innerVal]) =>
        ans.push(innerVal.totalGrossPay)
      );
      return ans;
    });
    value.data.totalTax = Object.entries(
      data as TPayrollGraphAnalyticsItem4Waterfall
    ).map(([key, value]) => {
      let ans: number[] = [];
      Object.entries(value).forEach(([innerkey, innerVal]) =>
        ans.push(innerVal.totalTax)
      );
      return ans;
    });
    value.data.totalPension = Object.entries(
      data as TPayrollGraphAnalyticsItem4Waterfall
    ).map(([key, value]) => {
      let ans: number[] = [];
      Object.entries(value).forEach(([innerkey, innerVal]) =>
        ans.push(innerVal.totalPension)
      );
      return ans;
    });
    value.data.totalAllowances = Object.entries(
      data as TPayrollGraphAnalyticsItem4Waterfall
    ).map(([key, value]) => {
      let ans: number[] = [];
      Object.entries(value).forEach(([innerkey, innerVal]) =>
        ans.push(innerVal.totalAllowances)
      );
      return ans;
    });
    value.data.totalDeductions = Object.entries(
      data as TPayrollGraphAnalyticsItem4Waterfall
    ).map(([key, value]) => {
      let ans: number[] = [];
      Object.entries(value).forEach(([innerkey, innerVal]) =>
        ans.push(innerVal.totalDeductions)
      );
      return ans;
    });
  } else {
    value.labels = Object.keys(
      (data as TPayrollGraphAnalyticsItem).totalAllowances
    );

    value.data.totalNetPay = Object.entries(
      (data as TPayrollGraphAnalyticsItem).totalNetPay
    ).map(([key, value]) => {
      return value;
    });
    value.data.totalGrossPay = Object.entries(
      (data as TPayrollGraphAnalyticsItem).totalGrossPay
    ).map(([key, value]) => {
      return value;
    });
    value.data.totalTax = Object.entries(
      (data as TPayrollGraphAnalyticsItem).totalTax
    ).map(([key, value]) => {
      return value;
    });
    value.data.totalPension = Object.entries(
      (data as TPayrollGraphAnalyticsItem).totalPension
    ).map(([key, value]) => {
      return value;
    });
    value.data.totalAllowances = Object.entries(
      (data as TPayrollGraphAnalyticsItem).totalAllowances
    ).map(([key, value]) => {
      return value;
    });
    value.data.totalDeductions = Object.entries(
      (data as TPayrollGraphAnalyticsItem).totalDeductions
    ).map(([key, value]) => {
      return value;
    });
  }
  return value;
};

export const selectPayrollGraphAnalyticsData = (
  parseData: TParseData,
  type: TPayrollGraphTabItem
): TPayrollGraphAnalyticsFormattedData => {
  const value: { labels: string[]; data: number[] | number[][] } = {
    labels: parseData.labels,
    data: [],
  };
  switch (type) {
    case "Net Pay":
      value.data = parseData.data.totalNetPay;

      break;
    case "Gross Pay":
      value.data = parseData.data.totalGrossPay;

      break;
    case "Tax":
      value.data = parseData.data.totalTax;

      break;
    case "Pension":
      value.data = parseData.data.totalPension;

      break;
    case "Total Allowances":
      value.data = parseData.data.totalAllowances;

      break;
    case "Total Deductions":
      value.data = parseData.data.totalDeductions;

      break;

    default:
      break;
  }
  return value;
};
