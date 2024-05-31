import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { AttendanceSubToper } from "features/timeAndAttendance/components/AttendanceSubToper";

const SwapShiftRequest = () => {
  return (
    <>
      <AttendanceSubToper active="swap-shift-request" />
      <div className="Container">
        <div>
          <PageIntro
            title="Swap Shift Request"
            link={appRoutes.attendanceHome}
          />
          <p className="pt-2 pb-5">
            You can now approve and request for shift swap.
          </p>
        </div>
      </div>
    </>
  );
};

export default SwapShiftRequest;
