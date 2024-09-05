import { Link } from "react-router-dom";
import onIndicator from "../assets/images/indicatorOn.svg";
import breakIndicator from "../assets/images/breakIndicate.svg";
import { appRoutes } from "config/router/paths";
import { SoftClockIn } from "./SoftClockIn";
import { SoftClockOut } from "./SoftClockOut";
import LiveClock from "components/clock/LiveClock";
import { useClockingAndBreakStatus } from "../hooks/useClockingAndBreakStatus";
import { useState } from "react";
import { GoBreak } from "./GoBreak";
import { SwitchActivity } from "./SwitchActivity";
import { PermissionRestrictor } from "components/permission-restriction/PermissionRestrictor";

interface IProps {
  active:
    | "time-sheet"
    | "time-off"
    | "reports"
    | "none-active"
    | "swap-shift-request";
}

export const AttendanceSubToper = (props: IProps) => {
  const applyStyle = "text-caramel pb-3";
  const { data } = useClockingAndBreakStatus();
  const [goOnBreak, setGoOnBreak] = useState(false);
  const [switchActivity, setSwitchActivity] = useState(false);

  return (
    <>
      <SwitchActivity
        open={switchActivity}
        handleClose={() => setSwitchActivity(false)}
      />
      <GoBreak open={goOnBreak} handleClose={() => setGoOnBreak(false)} />
      <div className="flex items-center justify-between py-3 mb-5 bg-card Container">
        <div className="flex items-center gap-x-4 text-sm font-medium">
        <PermissionRestrictor
            requiredPermissions={["view-all-time-and-attendance-timesheet"]}
          >
          <Link
            to={appRoutes.timeSheet}
            className={
              props.active === "time-sheet"
                ? `${applyStyle}`
                : "pb-3 hover:text-caramel"
            }
          >
            Timesheet
          </Link>
          </PermissionRestrictor>
          <Link
            to={appRoutes.timeOff}
            className={
              props.active === "time-off"
                ? `${applyStyle}`
                : "pb-3 hover:text-caramel"
            }
          >
            Timeoff
          </Link>
          <Link
            to={appRoutes.swapShiftRequest}
            className={
              props.active === "swap-shift-request"
                ? `${applyStyle}`
                : "pb-3 hover:text-caramel"
            }
          >
            Swap Shift Request
          </Link>
          <PermissionRestrictor
            requiredPermissions={["view-time-and-attendance-reports"]}
          >
            <Link
              to={appRoutes.hoursPerEmployee}
              className={
                props.active === "reports"
                  ? `${applyStyle}`
                  : "pb-3 hover:text-caramel"
              }
            >
              Reports
            </Link>
          </PermissionRestrictor>

          <PermissionRestrictor
              requiredPermissions={["manage-time-and-attendance-settings"]}
            >
          <Link
            to={appRoutes.timeTrackingRules}
            className={"pb-3 hover:text-caramel"}
          >
            Settings
          </Link>
          </PermissionRestrictor>
        </div>

        <div className="flex items-center gap-x-4 mt-2">
          <LiveClock format="hh:mm:ss A" />
          <img
            src={onIndicator}
            alt="on indicator"
            title="Switch Activity"
            onClick={() => setSwitchActivity(true)}
            className="cursor-pointer"
          />

          <img
            src={breakIndicator}
            alt="break indicator"
            onClick={() => setGoOnBreak(true)}
            title="Go on Break"
            className="cursor-pointer"
          />

          {data?.clocking.clockIn !== null &&
          data?.clocking.clockOut === null ? (
            <SoftClockOut componentType="image" />
          ) : (
            <SoftClockIn componentType="image" />
          )}
        </div>
      </div>
    </>
  );
};
