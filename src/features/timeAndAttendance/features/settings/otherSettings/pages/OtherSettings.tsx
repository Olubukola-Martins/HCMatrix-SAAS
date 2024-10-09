import { TimeAttendanceSettingsNav } from "../../components/TimeAttendanceSettingsNav";
import { AttendanceSettingsIntro } from "../../components/AttendanceSettingsIntro";
import { AttendanceSetUp } from "../components/AttendanceSetUp";
import { LatenessPolicy } from "../components/LatenessPolicy";
import { AbsenteeismPolicy } from "../components/AbsenteeismPolicy";

export const OtherSettings = () => {
  return (
    <div>
      <TimeAttendanceSettingsNav active="other settings" />
      <AttendanceSettingsIntro
        title={"Other settings"}
        description="Complete the following settings"
      />
      <div className="Container mt-7">
        <div className="bg-card rounded md:p-5 p-3">
          <AttendanceSetUp />
          <LatenessPolicy />
          <AbsenteeismPolicy />
        </div>
      </div>
    </div>
  );
};
