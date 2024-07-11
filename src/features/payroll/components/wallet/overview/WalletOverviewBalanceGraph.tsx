import { DatePicker, Select } from "antd";
import { useState } from "react";
import { TPayrollGraphAnalyticsItemType } from "features/payroll/types/payroll";
import { useGetPayrollGraphAnalytics } from "features/payroll/hooks/payroll/analytics/useGetPayrollGraphAnalytics";
import {
  parsePayrollGraphAnalyticsData,
  selectPayrollGraphAnalyticsData,
} from "features/payroll/utils/parsePayrollGraphData";
import dayjs from "dayjs";
import { CURRENT_YEAR } from "constants/dateFormats";
import PayrollGraphsContainer from "../../graphs/PayrollGraphsContainer";
import { IDivProps } from "types/html";

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

type IProps = Pick<IDivProps, "className">;

const WalletOverviewBalanceGraph: React.FC<IProps> = ({
  className = "flex flex-col gap-4",
}) => {
  const [chartItem, setChartItem] = useState<TPayrollGraphAnalyticsItemType>(
    CHART_ITEMS[0]
  );

  const [year, setYear] = useState<string>(CURRENT_YEAR);
  const { data, isLoading } = useGetPayrollGraphAnalytics({
    type: chartItem,
    year,
  });

  const parseAnalyticData = parsePayrollGraphAnalyticsData({ chartItem, data });
  const analyticsData = selectPayrollGraphAnalyticsData(
    parseAnalyticData,
    "Gross Pay"
  );
  return (
    <div className={className}>
      {/* header */}
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">Wallet Balance</h4>

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
              value={dayjs(year)}
              picker="year"
              className="w-full"
              placeholder="Select Year"
              onChange={(val) => setYear(val.format("YYYY"))}
            />
          </div>
        </div>
      </div>
      {/* container 4 graphs */}
      <PayrollGraphsContainer
        analyticsData={analyticsData}
        chartItem={chartItem}
        isLoading={isLoading}
      />
    </div>
  );
};

export default WalletOverviewBalanceGraph;
