import { Skeleton } from "antd";
import {
  AreaChart,
  BarChart,
  Histogram,
  LineChart,
  PieChart,
  RadarChart,
  ScatterChart,
  WaterFallChart,
} from "components/charts";
import {
  TPayrollGraphAnalyticsFormattedData,
  TPayrollGraphAnalyticsItemType,
} from "features/payroll/types/payroll/analytics";
import React from "react";
import { generateHexColor } from "utils/colorHelpers/generateHexColor";

interface IProps {
  chartItem?: TPayrollGraphAnalyticsItemType;
  analyticsData?: TPayrollGraphAnalyticsFormattedData;
  isLoading?: boolean;
}

const PayrollGraphsContainer: React.FC<IProps> = ({
  chartItem,
  analyticsData = { data: [], labels: [] },
  isLoading,
}) => {
  return (
    <div className="h-72">
      <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
        {chartItem === "spider-chart" && (
          <div className=" w-2/3 mx-auto">
            <RadarChart
              data={analyticsData.data as number[]}
              labels={analyticsData.labels}
              dataEntityLabel="Amount"
              bgColors={"#ff6647"}
            />
          </div>
        )}
        {chartItem === "line-chart" && (
          <LineChart
            data={analyticsData.data as number[]}
            labels={analyticsData.labels}
            dataEntityLabel="Amount"
            bgColors={"#ff6647"}
          />
        )}
        {chartItem === "area-graph" && (
          <AreaChart
            data={analyticsData.data as number[]}
            labels={analyticsData.labels}
            dataEntityLabel="Amount"
            bgColors={"#ff6647"}
          />
        )}
        {chartItem === "scatter-chart" && (
          <ScatterChart
            data={analyticsData.data as number[]}
            labels={analyticsData.labels}
            dataEntityLabel="Amount"
            bgColors={"#ff6647"}
          />
        )}
        {chartItem === "bar-chart" && (
          <BarChart
            data={analyticsData.data as number[]}
            labels={analyticsData.labels}
            dataEntityLabel="Amount"
            bgColors={"#ff6647"}
          />
        )}
        {chartItem === "histogram" && (
          <Histogram
            data={analyticsData.data as number[]}
            labels={analyticsData.labels}
            dataEntityLabel="Amount"
            bgColors={analyticsData.labels.map(
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
                data: analyticsData.data as number[][],
                label: "Amount Variation",
                borderColor: analyticsData.labels.map(
                  (val) => `${generateHexColor(`${val}`)}80`
                ),
                backgroundColor: analyticsData.labels.map(
                  (val) => `${generateHexColor(`${val}`)}`
                ),
              },
            ]}
            labels={analyticsData.labels}
            dataEntityLabel="Amount"
            bgColors={"#ff6647"}
          />
        )}
        {chartItem === "pie-chart" && (
          <div className=" w-2/3 mx-auto">
            <PieChart
              data={analyticsData.data as number[]}
              labels={analyticsData.labels}
              dataEntityLabel="Amount"
              bgColors={analyticsData.labels.map(
                (val) => `${generateHexColor(`${val}`)}`
              )}
            />
          </div>
        )}
      </Skeleton>
    </div>
  );
};

export default PayrollGraphsContainer;
