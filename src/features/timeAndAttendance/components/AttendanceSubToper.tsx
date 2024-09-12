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
import { Dropdown, Menu } from "antd";

interface IProps {
  active:
    | "time-sheet"
    | "time-off"
    | "reports"
    | "none-active"
    | "swap-shift-request";
}

export const AttendanceSubToper = (props: IProps) => {
  const applyStyle = "text-caramel";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 py-4 mb-5 bg-card Container">
        <div className="lg:col-span-2 flex items-center gap-x-4 text-sm font-medium">
          <Link
            to={appRoutes.timeSheet}
            className={
              props.active === "time-sheet"
                ? `${applyStyle}`
                : "hover:text-caramel"
            }
          >
            Timesheet
          </Link>

          <Link
            to={appRoutes.timeOff}
            className={
              props.active === "time-off"
                ? `${applyStyle}`
                : "hover:text-caramel"
            }
          >
            Timeoff
          </Link>
          <Link
            to={appRoutes.swapShiftRequest}
            className={
              props.active === "swap-shift-request"
                ? `${applyStyle}`
                : "hover:text-caramel"
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
                  ? `${applyStyle} hidden lg:flex`
                  : "hover:text-caramel hidden lg:flex"
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
              className={"hover:text-caramel hidden lg:flex"}
            >
              Settings
            </Link>
          </PermissionRestrictor>
          <div>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu>
                  <Menu.Item>
                    <Link to={appRoutes.hoursPerEmployee}>Reports</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to={appRoutes.timeTrackingRules}>Settings</Link>
                  </Menu.Item>
                </Menu>
              }
            >
              <i className="ri-more-fill text-xl cursor-pointer"></i>
            </Dropdown>
          </div>
        </div>

        <div className="flex justify-start md:justify-end items-center gap-x-4">
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
