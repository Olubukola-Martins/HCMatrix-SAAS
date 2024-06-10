import { DatePicker, Skeleton } from "antd";
import { LineChart } from "components/charts/LineChart";
import { useGetVehicleOverviewAnalytics } from "../hooks/useGetVehicleOverviewAnalytics";
import { useState } from "react";
import moment, { Moment } from "moment";

export const VehicleMonthlyInsightsCard = () => {
  const [year, setYear] = useState<Moment | null>(moment());

  const { data, isLoading } = useGetVehicleOverviewAnalytics({
    year: year?.format("YYYY"),
  });

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
          <DatePicker
            value={year}
            onChange={(val) => setYear(val)}
            picker="year"
            placeholder="Year"
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
