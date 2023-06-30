import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import React from "react";

export const WorkSchedule = () => {
  return (
    <>
      <TimeAttendanceSettingsNav active="Create Work Schedule" />
      <AttendanceSettingsIntro
        title={"Create Work Schedule"}
        description="Plan work by setting your team's work and break time. Manage overtime rules in settings"
      />
    </>
  );
};
