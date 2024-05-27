import { TimeAttendanceSettingsNav } from "../../components/TimeAttendanceSettingsNav";
import { AttendanceSettingsIntro } from "../../components/AttendanceSettingsIntro";



export const OtherSettings = () => {
  return (
    <div>
      <TimeAttendanceSettingsNav active="other settings" />
      <AttendanceSettingsIntro
        title={"Other settings"}
        description="Complete the following settings"
      />
      <div className="Container mt-7">
        <div className="bg-card rounded md:p-5 p-3"></div>
      </div>
    </div>
  );
};
