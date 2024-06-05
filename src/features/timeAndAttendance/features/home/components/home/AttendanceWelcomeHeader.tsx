import React from "react";
import { IDivProps } from "types/html";
import FilterDBBtn, { TFilterAttendanceDBBtnProps } from "./FilterDBBtn";

type IProps = IDivProps & {
  greeting: string;
  userFullName?: string;
  welcomeNoteData: string;
  month: string;
  fullYear: string | number;
  filterProps: TFilterAttendanceDBBtnProps;
};
const AttendanceWelcomeHeader: React.FC<IProps> = ({
  className = "flex justify-between",
  greeting,
  userFullName,
  month,
  fullYear,
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
        <button className="border rounded px-3 py-2 flex items-center gap-x-3 font-medium">
          <i className="ri-calendar-2-line"></i>
          <span>
            {month} {fullYear}
          </span>
        </button>
        <FilterDBBtn {...filterProps} />
      </div>
    </div>
  );
};

export default AttendanceWelcomeHeader;
