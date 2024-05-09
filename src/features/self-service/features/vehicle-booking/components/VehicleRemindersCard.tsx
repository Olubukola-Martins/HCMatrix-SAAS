import React from "react";
import { useGetVehicleOverviewAnalytics } from "../hooks/useGetVehicleOverviewAnalytics";
import { PieChart } from "components/charts/PieChart";
import { Skeleton } from "antd";

export const VehicleRemindersCard = () => {
  const { data, isLoading } = useGetVehicleOverviewAnalytics();

  return (
    <div>
      <div className="border rounded-md px-4 py-2 shadow">
        <p>Reminders</p>
        <div className="flex justify-center my-6">
          <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
            <div className="w-72">
              <PieChart
                data={data ? Object.values(data?.vehicleByStatus) : []}
                labels={data ? Object.keys(data?.vehicleByStatus) : []}
                dataEntityLabel="reminders"
                bgColors={["#ff6647", "#FFA600", "#FFDBD3", "#cfcfcf"]}
              />
            </div>
          </Skeleton>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#ff6647]" />
            <span className="text-sm">
              {data?.vehicleByStatus.assigned} Assigned
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ background: "#FFA600" }}
            />
            <span className="text-sm">
              {data?.vehicleByStatus.unassigned} Available
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-1">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ background: "#FFDBD3" }}
            />
            <span className="text-sm">
              {data?.vehicleByStatus["in-repair"]} Under Repair
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#cfcfcf]" />
            <span className="text-sm">
              {data?.vehicleByStatus.condemned} Condemned
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
