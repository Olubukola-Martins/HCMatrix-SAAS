import { LineChart } from "components/charts/LineChart";
import { useGetDashboardGraph } from "../features/home/hooks/useGetDashboardGraph";
import { useState } from "react";
import { graphFilterProps } from "../features/home/types";
import { Input } from "antd";

export const AttendanceMonthCard = () => {
  const [graphFilter, setGraphFilter] = useState<graphFilterProps>({
    year: +new Date().getFullYear(),
    month: +new Date().getMonth() + 1,
    week: 1,
  });
  const { data, isLoading } = useGetDashboardGraph(graphFilter);
  return (
    <div className="col-span-3 bg-mainBg w-full border flex flex-col gap-4 mt-4 rounded-lg text-sm shadow p-3">
      <div className="flex justify-end items-center gap-x-4">
        <Input
          value={graphFilter.year}
          onChange={(e) =>
            setGraphFilter((val) => {
              return {
                ...val,
                year: e.target.value ? +e.target.value : undefined,
              };
            })
          }
          placeholder="Year"
        />
        <Input
          value={graphFilter.month}
          onChange={(e) =>
            setGraphFilter((val) => {
              return {
                ...val,
                month: e.target.value ? +e.target.value : undefined,
              };
            })
          }
          placeholder="Month"
        />
        <Input
          value={graphFilter.week}
          onChange={(e) =>
            setGraphFilter((val) => {
              return {
                ...val,
                week: e.target.value ? +e.target.value : undefined,
              };
            })
          }
          placeholder="Week"
        />
      </div>

      <div className="flex-1">
        <LineChart
          // maintainAspectRatio={false}
          data={data ? Object.values(data) : []}
          labels={data ? Object.keys(data) : []}
          dataEntityLabel="Attendance Record"
          bgColors={`#ff6647`}
        />
      </div>
    </div>
  );
};
