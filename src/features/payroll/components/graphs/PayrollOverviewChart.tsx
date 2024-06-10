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
import { TPayrollGraphTabItem } from "features/payroll/types/payroll/analytics";
import {
  parsePayrollGraphAnalyticsData,
  selectPayrollGraphAnalyticsData,
} from "features/payroll/utils/parsePayrollGraphData";
import PayrollGraphsContainer from "./PayrollGraphsContainer";
import moment from "moment";
import { CURRENT_YEAR } from "constants/dateFormats";

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
  const [chartItem, setChartItem] = useState<TPayrollGraphAnalyticsItemType>(
    CHART_ITEMS[0]
  );
  // TODO: Create a default date that will use the current year

  const [year, setYear] = useState<string>(CURRENT_YEAR);
  const { data, isLoading } = useGetPayrollGraphAnalytics({
    type: chartItem,
    year,
  });

  const parseAnalyticData = parsePayrollGraphAnalyticsData({ chartItem, data });
  const analyticsData = selectPayrollGraphAnalyticsData(
    parseAnalyticData,
    selectedPayrollItem
  );
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
                setChartItem(val)
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
              value={moment(year)}
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
      {/* container 4 graphs */}
      <PayrollGraphsContainer
        analyticsData={analyticsData}
        chartItem={chartItem}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PayrollOverviewChart;
