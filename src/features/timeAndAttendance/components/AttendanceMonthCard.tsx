import { LineChart } from "components/charts/LineChart";
import { useGetDashboardGraph } from "../features/home/hooks/useGetDashboardGraph";
import { useState } from "react";
import { graphFilterProps } from "../features/home/types";

export const AttendanceMonthCard = () => {
  const [graphFilter, setGraphFilter] = useState<graphFilterProps>({
    year: +new Date().getFullYear(),
    month: +new Date().getMonth(),
    week: 1,
  });
  const { data, isLoading } = useGetDashboardGraph(graphFilter);
  return (
    <div className="col-span-3 bg-mainBg border flex flex-col gap-4 mt-4 rounded-lg text-sm shadow p-3">
       

       
      <LineChart
        maintainAspectRatio={false}
        data={data ? Object.values(data) : []}
        labels={data ? Object.keys(data) : []}
        dataEntityLabel="Attendance Record"
        bgColors={`#ff6647`}
      />
    </div>
  );
};
