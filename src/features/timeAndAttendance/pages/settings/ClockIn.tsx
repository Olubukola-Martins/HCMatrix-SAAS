import { AppButton } from "components/button/AppButton";
import { AttendanceSettingsIntro } from "features/timeAndAttendance/components/settings/AttendanceSettingsIntro";
import { TimeAttendanceSettingsNav } from "features/timeAndAttendance/components/settings/TimeAttendanceSettingsNav";

import { useState } from "react";
import { AddClockIn } from "features/timeAndAttendance/components/settings/AddClockIn";

export const ClockIn = () => {
  const [addClockIn, setAddClockIn] = useState(false);

  return (
    <>
      <TimeAttendanceSettingsNav active="clock in settings" />
      <AttendanceSettingsIntro
        title={"Clock in Settings"}
        description="Select Clock-in options."
      />
      <AddClockIn open={addClockIn} handleClose={() => setAddClockIn(false)} />
      <div className="Container mt-7">
        <div className="flex justify-end">
          <AppButton
            label="Add clock in"
            handleClick={() => setAddClockIn(true)}
          />
        </div>
      </div>
    </>
  );
};
