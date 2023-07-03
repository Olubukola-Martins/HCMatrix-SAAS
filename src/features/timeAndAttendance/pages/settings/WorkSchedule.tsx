import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import React, { useState } from "react";

export const WorkSchedule = () => {
  const [switchWorkArr, setSwitchWorkArr] = useState("fixed");
  const boxStyle =
    "border py-3 px-5 text-accent font-medium text-base cursor-pointer";
  return (
    <>
      <TimeAttendanceSettingsNav active="Create Work Schedule" />
      <AttendanceSettingsIntro
        title={"Create Work Schedule"}
        description="Plan work by setting your team's work and break time. Manage overtime rules in settings"
      />

      <div className="Container mt-7">
        <div className="border rounded-md md:p-4 p-2">
          <h3 className="font-semibold text-lg">Schedule</h3>

          <div className="flex items-center gap-x-3">
            <h4 className="text-base">Work arrangement</h4>
            <div className="flex items-center">
              <div
                onClick={() => setSwitchWorkArr("fixed")}
                className={
                  switchWorkArr === "fixed"
                    ? `${boxStyle} bg-caramel rounded-l`
                    : `${boxStyle} rounded-l`
                }
              >
                <h5>Fixed</h5>
              </div>
              <div
                onClick={() => setSwitchWorkArr("flexible")}
                className={
                  switchWorkArr === "flexible"
                    ? `${boxStyle} bg-caramel`
                    : `${boxStyle}`
                }
              >
                <h5>Flexible</h5>
              </div>
              <div className={boxStyle}>
                <h5>Weekly</h5>
              </div>
              <div className={`${boxStyle} rounded-r`}>
                <h5>Shift</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
