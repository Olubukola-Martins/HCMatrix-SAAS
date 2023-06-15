import { Select, Skeleton } from "antd";
import { LineChart } from "components/charts/LineChart";
import { MONTH_CHART_LABELS } from "constants/general";
import { useGetVehicleOverviewAnalytics } from "../hooks/useGetVehicleOverviewAnalytics";
import { useState } from "react";

export const VehicleMonthlyInsightsCard = () => {
  const [year, setYear] = useState<string>();

  const { data, isLoading } = useGetVehicleOverviewAnalytics({ year });

  return (
    <div className="col-span-3 bg-mainBg border mt-4 rounded-lg text-sm shadow p-3">
      <div className="flex  justify-between">
        <div>
          <h4>Total Vehicles</h4>
          <span className="font-semibold text-lg">
            {data?.totalVehicles.totalYearCount}
          </span>
        </div>
        <div>
          <Select
            value={year}
            placeholder="Year"
            onSelect={(val: string) => setYear(val)}
            options={["2023", "2022", "2021"].map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>
      </div>
      <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
        <LineChart
          data={data ? Object.values(data?.totalVehicles.countsByMonth) : []}
          // labels={MONTH_CHART_LABELS}
          labels={data ? Object.keys(data?.totalVehicles.countsByMonth) : []}
          dataEntityLabel="vehicles"
          bgColors={"#aaa"}
        />
      </Skeleton>
    </div>
  );
};
