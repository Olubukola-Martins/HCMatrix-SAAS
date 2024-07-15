import { SimpleCard } from "components/cards/SimpleCard";
import { PermissionRestrictor } from "components/permission-restriction/PermissionRestrictor";
import React from "react";
import { IDivProps } from "types/html";
type IProps = IDivProps;
const AttendanceHomeCards: React.FC<IProps> = ({
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-3",
}) => {
  return (
    <div className={className}>
      <PermissionRestrictor
        requiredPermissions={["view-time-and-attendance-dashboard-summary"]}
      >
        <SimpleCard title="Total Number of Employees" highlight={0} />
        <SimpleCard title="Number of Employees Present" highlight={0} />
        <SimpleCard title="Number of Employees Late" highlight={0} />
        <SimpleCard title="Number of Employees Absent " highlight={0} />
      </PermissionRestrictor>

      <SimpleCard title="Clocked in time" highlight={0} />
      <SimpleCard title="Break time" highlight={0} />
      <SimpleCard title="Clocked out time" highlight={0} />
      <SimpleCard title="Total Hours Spent for the day" highlight={0} />
    </div>
  );
};

export default AttendanceHomeCards;
