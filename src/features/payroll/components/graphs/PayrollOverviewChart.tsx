import { DatePicker, Select, Skeleton } from "antd";
import { ChartSwitcher } from "components/controls/ChartSwitcher";
import { useState } from "react";
import { LineChart } from "components/charts/LineChart";
import { BarChart } from "components/charts/BarChart";
import { PieChart } from "components/charts/PieChart";
import { WaterFallChart } from "components/charts/WaterFallChart";
import { generateHexColor } from "utils/colorHelpers/generateHexColor";
import { ScatterChart } from "components/charts/ScatterChart";
import { Histogram } from "components/charts/Histogram";
import { AreaChart } from "components/charts/AreaChart";
import { RadarChart } from "components/charts/RadarChart";
import { TPayrollGraphAnalyticsItemType } from "features/payroll/types/payroll";
import { useGetPayrollGraphAnalytics } from "features/payroll/hooks/payroll/analytics/useGetPayrollGraphAnalytics";
import {
  TPayrollGraphAnalyticsItem,
  TPayrollGraphAnalyticsItem4Waterfall,
  TPayrollGraphTabItem,
} from "features/payroll/types/payroll/analytics";

const CHART_ITEMS: TPayrollGraphAnalyticsItemType[] = [
  "bar-chart",
  "line-chart",
  "scatter-chart",
  "waterfall-chart",
  "pie-chart",
  "histogram",
  "area-graph",
  "spider-chart",
];

const PAYROLL_ITEMS: TPayrollGraphTabItem[] = [
  "Net Pay",
  "Gross Pay",
  "Tax",
  "Pension",
  "Total Deductions",
  "Total Allowances",
];
const PayrollOverviewChart = () => {
  const [selectedPayrollItem, setSelectedPayrollItem] =
    useState<TPayrollGraphTabItem>(PAYROLL_ITEMS[0]);
  const [chartItem, seTPayrollGraphAnalyticsItemType] =
    useState<TPayrollGraphAnalyticsItemType>(CHART_ITEMS[0]);
  // TODO: Create a default date format
  const [year, setYear] = useState<string>("2023");
  const { data, isLoading } = useGetPayrollGraphAnalytics({
    type: chartItem,
    year,
  });
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
  const parseData = (): TParseData => {
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
      value.labels = Object.keys(data as TPayrollGraphAnalyticsItem);
      value.data.totalNetPay = Object.entries(
        data as TPayrollGraphAnalyticsItem
      ).map(([key, value]) => {
        return value.totalNetPay;
      });
      value.data.totalGrossPay = Object.entries(
        data as TPayrollGraphAnalyticsItem
      ).map(([key, value]) => {
        return value.totalGrossPay;
      });
      value.data.totalTax = Object.entries(
        data as TPayrollGraphAnalyticsItem
      ).map(([key, value]) => {
        return value.totalTax;
      });
      value.data.totalPension = Object.entries(
        data as TPayrollGraphAnalyticsItem
      ).map(([key, value]) => {
        return value.totalPension;
      });
      value.data.totalAllowances = Object.entries(
        data as TPayrollGraphAnalyticsItem
      ).map(([key, value]) => {
        return value.totalAllowances;
      });
      value.data.totalDeductions = Object.entries(
        data as TPayrollGraphAnalyticsItem
      ).map(([key, value]) => {
        return value.totalDeductions;
      });
    }
    return value;
  };

  const selectData = (
    type: TPayrollGraphTabItem
  ): { labels: string[]; data: number[] | number[][] } => {
    const value: { labels: string[]; data: number[] | number[][] } = {
      labels: [],
      data: [],
    };
    switch (type) {
      case "Net Pay":
        value.data = parseData().data.totalNetPay;

        break;
      case "Gross Pay":
        value.data = parseData().data.totalGrossPay;

        break;
      case "Tax":
        value.data = parseData().data.totalTax;

        break;
      case "Pension":
        value.data = parseData().data.totalPension;

        break;
      case "Total Allowances":
        value.data = parseData().data.totalAllowances;

        break;
      case "Total Deductions":
        value.data = parseData().data.totalDeductions;

        break;

      default:
        break;
    }
    return value;
  };
  return (
    <div className="flex flex-col gap-4">
      {/* header */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg">Payroll Graphs and Charts</h4>

        <div className="flex gap-2 text-sm">
          <div>
            <Select
              value={chartItem}
              onSelect={(val: TPayrollGraphAnalyticsItemType) =>
                seTPayrollGraphAnalyticsItemType(val)
              }
              options={CHART_ITEMS.map((item) => ({
                value: item,
                label: (
                  <span className="capitalize">
                    {item.split("-").join(" ")}
                  </span>
                ),
              }))}
              placeholder={`Select Component`}
            />
          </div>
          <div>
            <DatePicker
              picker="year"
              className="w-full"
              placeholder="Select Year"
              onSelect={(val) => setYear(val.format("YYYY"))}
            />
          </div>
        </div>
      </div>
      {/* payroll Item controller */}
      <ChartSwitcher
        defaultItem={PAYROLL_ITEMS[0]}
        items={PAYROLL_ITEMS}
        handleClick={(key) =>
          setSelectedPayrollItem(key as TPayrollGraphTabItem)
        }
      />
      <div className="h-72">
        <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
          {chartItem === "spider-chart" && (
            <div className=" w-2/3 mx-auto">
              <RadarChart
                data={selectData(selectedPayrollItem).data as number[]}
                labels={selectData(selectedPayrollItem).labels}
                dataEntityLabel="Amount"
                bgColors={"#ff6647"}
              />
            </div>
          )}
          {chartItem === "line-chart" && (
            <LineChart
              data={selectData(selectedPayrollItem).data as number[]}
              labels={selectData(selectedPayrollItem).labels}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          )}
          {chartItem === "area-graph" && (
            <AreaChart
              data={selectData(selectedPayrollItem).data as number[]}
              labels={selectData(selectedPayrollItem).labels}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          )}
          {chartItem === "scatter-chart" && (
            <ScatterChart
              data={selectData(selectedPayrollItem).data as number[]}
              labels={selectData(selectedPayrollItem).labels}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          )}
          {chartItem === "bar-chart" && (
            <BarChart
              data={selectData(selectedPayrollItem).data as number[]}
              labels={selectData(selectedPayrollItem).labels}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          )}
          {chartItem === "histogram" && (
            <Histogram
              data={selectData(selectedPayrollItem).data as number[]}
              labels={selectData(selectedPayrollItem).labels}
              dataEntityLabel="Amount"
              bgColors={selectData(selectedPayrollItem).labels.map(
                (val) => `${generateHexColor(`${val}`)}`
              )}
            />
          )}
          {chartItem === "waterfall-chart" && (
            <WaterFallChart
              useDataSet
              dataSets={[
                // Object.values(data?.graphData.countsByMonth)
                {
                  data: selectData(selectedPayrollItem).data as number[][],
                  label: "rec",
                  borderColor: selectData(selectedPayrollItem).labels.map(
                    (val) => `${generateHexColor(`${val}`)}80`
                  ),
                  backgroundColor: selectData(selectedPayrollItem).labels.map(
                    (val) => `${generateHexColor(`${val}`)}`
                  ),
                },
              ]}
              labels={selectData(selectedPayrollItem).labels}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          )}
          {chartItem === "pie-chart" && (
            <div className=" w-2/3 mx-auto">
              <PieChart
                data={selectData(selectedPayrollItem).data as number[]}
                labels={selectData(selectedPayrollItem).labels}
                dataEntityLabel="Amount"
                bgColors={"#ff6647"}
              />
            </div>
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default PayrollOverviewChart;
