import React from "react";
import { IDivProps } from "types/html";
import { Skeleton } from "antd";
import { AnalyticsRecordProps } from "../../types";

interface IProps extends IDivProps {
  analyticsData?: AnalyticsRecordProps;
  isLoadingAnalyticsData: boolean;
}

const AttendanceStatusHomeCard: React.FC<IProps> = ({
  className = "bg-mainBg pb-3 border rounded-lg text-sm shadow mt-4",
  analyticsData,
  isLoadingAnalyticsData,
}) => {
  const attendanceStatusHomeAttrs = [
    {
      name: "Clocked In",
      value: analyticsData?.clockIns ?? 0,
    },
    {
      name: "On Break",
      value: analyticsData?.employeesOnBreak ?? 0,
    },
    {
      name: "Clocked Out",
      value: analyticsData?.clockOuts ?? 0,
    },
    {
      name: "Remote Workers",
      value: analyticsData?.remoteWorkers?.count ?? 0,
    },
  ];

  return (
    <div className={className}>
      <div className="flex items-center justify-between px-3 py-3">
        <p className="font-semibold text-lg">Attendance Status</p>
      </div>
      <div className="space-y-4 px-4 pt-6 pb-4">
        {attendanceStatusHomeAttrs.map(({ name, value }, i) => (
          <Skeleton
            key={i}
            active
            loading={isLoadingAnalyticsData}
            paragraph={{ rows: 3, width: "100%" }}
          >
            <div className="rounded-md bg-[#F6F7FB] shadow p-3 flex flex-col">
              <>
                <p className="text-sm font-medium py-3 capitalize">{name}</p>
                <h2 className="font-semibold text-lg">{value}</h2>
              </>
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default AttendanceStatusHomeCard;
