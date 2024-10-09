import React from "react";
import { IDivProps } from "types/html";
import FilterDBBtn, { TFilterAttendanceDBBtnProps } from "./FilterDBBtn";
import { PermissionRestrictor } from "components/permission-restriction/PermissionRestrictor";

type IProps = IDivProps & {
  greeting: string;
  userFullName?: string;
  welcomeNoteData: string;
  filterProps: TFilterAttendanceDBBtnProps;
  formattedToday: string;
};
const AttendanceWelcomeHeader: React.FC<IProps> = ({
  className = "flex justify-between",
  greeting,
  userFullName,
  formattedToday,
  welcomeNoteData,
  filterProps,
}) => {
  return (
    <div className={className}>
      <div>
        <h2 className="font-medium text-lg pb-2">
          Good {greeting} {userFullName}
        </h2>
        <p>{welcomeNoteData}</p>
      </div>
      <div className="space-x-4 flex items-start">
        <button className="border hidden lg:flex rounded cursor-text px-3 py-2 gap-x-3 font-medium">
          {formattedToday}
        </button>
        <PermissionRestrictor
          requiredPermissions={["view-all-time-and-attendance-timesheet"]}
        >
        <FilterDBBtn {...filterProps} />
        </PermissionRestrictor>
      </div>
    </div>
  );
};

export default AttendanceWelcomeHeader;
