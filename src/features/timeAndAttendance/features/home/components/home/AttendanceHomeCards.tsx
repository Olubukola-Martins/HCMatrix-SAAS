import { SimpleCard } from "components/cards/SimpleCard";
import { PermissionRestrictor } from "components/permission-restriction/PermissionRestrictor";
import React from "react";
import { IDivProps } from "types/html";
import { AnalyticsRecordProps } from "../../types";
import { useClockingAndBreakStatus } from "features/timeAndAttendance/hooks/useClockingAndBreakStatus";
import { convertMinutesToHours } from "features/timeAndAttendance/utils";

interface IProps extends IDivProps {
  analyticsData?: AnalyticsRecordProps;
  isLoadingAnalyticsData: boolean;
}

const AttendanceHomeCards: React.FC<IProps> = ({
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3",
  analyticsData,
  isLoadingAnalyticsData,
}) => {
  const { data, isLoading } = useClockingAndBreakStatus();

  return (
    <div className={className}>
      <PermissionRestrictor
        requiredPermissions={["view-time-and-attendance-dashboard-summary"]}
      >
        <SimpleCard
          loading={isLoadingAnalyticsData}
          title="Total Number of Employees"
          highlight={analyticsData?.totalEmployees ?? 0}
        />
        <SimpleCard
          loading={isLoadingAnalyticsData}
          title="Number of Employees Present"
          highlight={analyticsData?.totalEarlyEmployees ?? 0}
        />
        <SimpleCard
          loading={isLoadingAnalyticsData}
          title="Number of Employees Late"
          highlight={analyticsData?.totalLateEmployees ?? 0}
        />
        <SimpleCard
          loading={isLoadingAnalyticsData}
          title="Number of Employees Absent "
          highlight={analyticsData?.totalAbsentEmployees ?? 0}
        />
      </PermissionRestrictor>

      <SimpleCard
        loading={isLoading}
        title="Clocked in time"
        highlight={data?.clocking?.clockIn?.time ?? "---"}
      />
      <SimpleCard
        loading={isLoading}
        title="Break time"
        highlight={data?.activeBreakSession?.start ?? "----"}
      />
      <SimpleCard
        loading={isLoading}
        title="Clocked out time"
        highlight={data?.clocking?.clockOut?.time ?? "----"}
      />
      <SimpleCard
        loading={isLoading}
        title="Total Hours Spent for the day"
        highlight={convertMinutesToHours(data?.totalHoursSpentToday ?? 0)}
      />
    </div>
  );
};

export default AttendanceHomeCards;
