import { DatePicker, Select, Skeleton } from "antd";
import { ChartSwitcher } from "components/controls/ChartSwitcher";
import React, { useState } from "react";
import { useGetLoanAnalytics } from "features/self-service/features/loan/hooks/analytics/useGetLoanAnalytics";
import { LineChart } from "components/charts/LineChart";
import { BarChart } from "components/charts/BarChart";
import { PieChart } from "components/charts/PieChart";
import { WaterFallChart } from "components/charts/WaterFallChart";
import { generateHexColor } from "utils/colorHelpers/generateHexColor";
import { ScatterChart } from "components/charts/ScatterChart";
import { Histogram } from "components/charts/Histogram";
import { AreaChart } from "components/charts/AreaChart";
import { RadarChart } from "components/charts/RadarChart";

type TChartItem =
  | "bar-chart"
  | "line-chart"
  | "scatter-chart"
  | "waterfall-chart"
  | "pie-chart"
  | "histogram"
  | "area-graph"
  | "spider-chart";
const CHART_ITEMS: TChartItem[] = [
  "bar-chart",
  "line-chart",
  "scatter-chart",
  "waterfall-chart",
  "pie-chart",
  "histogram",
  "area-graph",
  "spider-chart",
];

const PAYROLL_ITEMS = [
  "Net Income",
  "Gross income",
  "Tax",
  "Pension",
  "Total Deductions",
  "Total Allowances",
];
const PayrollOverviewChart = () => {
  const handlePayrollItemSelection = (val: string) => {};
  const [chartItem, setChartItem] = useState<TChartItem>(CHART_ITEMS[0]);
  const [year, setYear] = useState<string>("2023");
  const { data, isLoading } = useGetLoanAnalytics({
    type: "all",
    props: { year },
  });
  return (
    <div className="flex flex-col gap-4">
      {/* header */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg">Payroll Graphs and Charts</h4>

        <div className="flex gap-2 text-sm">
          <div>
            <Select
              value={chartItem}
              onSelect={(val: TChartItem) => setChartItem(val)}
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
        handleClick={(key) => handlePayrollItemSelection(key)}
      />
      <div className="h-72">
        <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
          {chartItem === "spider-chart" && (
            <div className=" w-2/3 mx-auto">
              <RadarChart
                data={[45, 30, 20, 60, 10, 2, 3, 4, 23, 45, 56, 39]}
                labels={data ? Object.keys(data?.graphData.countsByMonth) : []}
                dataEntityLabel="Amount"
                bgColors={"#ff6647"}
              />
            </div>
          )}
          {chartItem === "line-chart" && (
            <LineChart
              data={data ? Object.values(data?.graphData.countsByMonth) : []}
              labels={data ? Object.keys(data?.graphData.countsByMonth) : []}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          )}
          {chartItem === "area-graph" && (
            <AreaChart
              data={data ? Object.values(data?.graphData.countsByMonth) : []}
              labels={data ? Object.keys(data?.graphData.countsByMonth) : []}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          )}
          {chartItem === "scatter-chart" && (
            <ScatterChart
              data={data ? Object.values(data?.graphData.countsByMonth) : []}
              labels={data ? Object.keys(data?.graphData.countsByMonth) : []}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          )}
          {chartItem === "bar-chart" && (
            <BarChart
              data={data ? Object.values(data?.graphData.countsByMonth) : []}
              labels={data ? Object.keys(data?.graphData.countsByMonth) : []}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          )}
          {chartItem === "histogram" && data?.graphData.countsByMonth && (
            <Histogram
              data={Array(12)
                .fill(0)
                .map((_, i) => (i + 4) * 2)}
              labels={data ? Object.keys(data?.graphData.countsByMonth) : []}
              dataEntityLabel="Amount"
              bgColors={Object.keys(data?.graphData.countsByMonth).map(
                (val) => `${generateHexColor(`${val}`)}`
              )}
            />
          )}
          {chartItem === "waterfall-chart" && data?.graphData.countsByMonth && (
            <WaterFallChart
              useDataSet
              dataSets={[
                // Object.values(data?.graphData.countsByMonth)
                {
                  data: [
                    [120, 20, 10], //no of times payroll is run in a month: amount
                    [2002, 340, 20],
                    [20, 50, 25],
                    [50, 45, 80],
                    [78, 34, 87],
                    [38, 72, 345],
                    [97, 5, 9],
                    [890, 12, 76],
                    [90, 13, 23],
                    [30, 12, 56],
                    [20, 83, 124],
                    [45, 12, 45],
                  ],
                  label: "rec",
                  borderColor: Object.keys(data?.graphData.countsByMonth).map(
                    (val) => `${generateHexColor(`${val}`)}80`
                  ),
                  backgroundColor: Object.keys(
                    data?.graphData.countsByMonth
                  ).map((val) => `${generateHexColor(`${val}`)}`),
                },
              ]}
              labels={data ? Object.keys(data?.graphData.countsByMonth) : []}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          )}
          {chartItem === "pie-chart" && (
            <div className=" w-2/3 mx-auto">
              <PieChart
                data={data ? Object.values(data?.graphData.countsByMonth) : []}
                labels={data ? Object.keys(data?.graphData.countsByMonth) : []}
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
