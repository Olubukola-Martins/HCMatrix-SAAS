import React from "react";
import { IDivProps } from "types/html";

type IProps = IDivProps;
const attendanceStatusHomeAttrs = [
  {
    name: "Clocked In",
    value: "23",
  },
  {
    name: "On Break",
    value: "30",
  },
  {
    name: "Clocked Out",
    value: "10",
  },
  {
    name: "Remote Workers",
    value: "5",
  },
];
const AttendanceStatusHomeCard: React.FC<IProps> = ({
  className = "bg-mainBg pb-3 border rounded-lg text-sm shadow mt-4",
}) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between px-3 py-3">
        <p className="font-semibold text-lg">Attendance Status</p>
      </div>
      <div className="space-y-4 px-4 pt-6 pb-4">
        {attendanceStatusHomeAttrs.map(({ name, value }, i) => (
          <div className={`rounded-md bg-[#F6F7FB] shadow p-3 flex flex-col `}>
            <>
              <p className="text-sm font-medium py-3 capitalize">{name}</p>
              <h2 className="font-semibold text-lg">{value}</h2>
            </>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceStatusHomeCard;
