import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";

export const TimeTrackingRules = () => {
  return (
    <>
      <TimeAttendanceSettingsNav active={"time tracking rules"} />
      <AttendanceSettingsIntro title="Select time tracking policies" />
      <div className="Container">
        
      </div>
    </>
  );
};
