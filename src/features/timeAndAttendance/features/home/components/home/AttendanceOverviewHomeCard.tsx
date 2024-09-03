import { Select } from "antd";
import { DoughnutChart } from "components/charts/DoughnutChart";
import React from "react";
import { IDivProps } from "types/html";
import { AnalyticsRecordProps } from "../../types";

interface IProps extends IDivProps {
  analyticsData?: AnalyticsRecordProps;
  isLoadingAnalyticsData: boolean;
}

const AttendanceOverviewHomeCard: React.FC<IProps> = ({
  className = "bg-mainBg pb-3 border rounded-lg text-sm shadow mt-4",
  analyticsData,
  isLoadingAnalyticsData,
}) => {
  const items = [
    {
      value: analyticsData?.totalEarlyEmployees ?? 0,
      color: "#01966B",
      name: "Present",
    },
    {
      value: analyticsData?.totalLateEmployees ?? 0,
      color: "#FFA600",
      name: "Late",
    },
    {
      value: analyticsData?.totalAbsentEmployees ?? 0,
      color: "#FF6647",
      name: "Absent",
    },
  ];
  return (
    <div className={className}>
      <div className="flex items-center justify-between px-3 py-3">
        <p className="font-medium text-lg">Attendance Overview</p>

        <Select
          options={[{ labeL: "Today", value: "Today" }]}
          value="Today"
          disabled
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div style={{ height: "300px", width: "300px" }} className="mt-4 mb-5">
          <DoughnutChart
            data={items.map((item) => item.value)}
            labels={[]}
            dataEntityLabel="Employees"
            bgColors={items.map((item) => item.color)}
            loading={isLoadingAnalyticsData}
          />
        </div>
        <div className="flex items-center gap-x-10">
          {items.map(({ name, color }, i) => (
            <div className="flex flex-col gap-y-3 items-center">
              <div
                key={i}
                className="w-8 h-3 rounded-sm"
                style={{ backgroundColor: color }}
              />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverviewHomeCard;
