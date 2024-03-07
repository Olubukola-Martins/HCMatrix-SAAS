import { Link } from "react-router-dom";
import onIndicator from "../assets/images/indicatorOn.svg";
import breakIndicator from "../assets/images/breakIndicate.svg";
import { appRoutes } from "config/router/paths";
import { SoftClockIn } from "./SoftClockIn";
import { SoftClockOut } from "./SoftClockOut";
import LiveClock from "components/clock/LiveClock";
import { useClockingAndBreakStatus } from "../hooks/useClockingAndBreakStatus";

interface IProps {
  active: "time-sheet" | "time-off" | "reports" | "none-active";
}

export const AttendanceSubToper = (props: IProps) => {
  const applyStyle = "text-caramel pb-3";
  const {data} = useClockingAndBreakStatus()
  console.log(data);
  
  return (
    <div className="flex items-center justify-between py-3 mb-5 bg-card Container">
      <div className="flex items-center gap-x-4 text-sm font-medium">
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
          to={appRoutes.shiftPerEmployee}
          className={
            props.active === "reports"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Reports
        </Link>
        <Link
          to={appRoutes.timeTrackingRules}
          className={"pb-3 hover:text-caramel"}
        >
          Settings
        </Link>
      </div>

      <div className="flex items-center gap-x-4 mt-2">
      <LiveClock format="hh:mm:ss A" />
        <img src={onIndicator} alt="on indicator" />
        <img src={breakIndicator} alt="break indicator" />
        {/* <SoftClockIn /> */}
        <SoftClockOut/>
      </div>
    </div>
  );
};
