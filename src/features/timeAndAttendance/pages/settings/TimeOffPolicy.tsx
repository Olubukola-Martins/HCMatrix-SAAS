import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";
import React from "react";

export const TimeOffPolicy = () => {
  return (
    <>
      <TimeAttendanceSettingsNav active="time off policy" />
      <AttendanceSettingsIntro
        title={"Create Time Off Policy"}
        description="Plan work by setting your team's work and break time. Manage overtime rules in settings"
      />
    </>
  );
};
