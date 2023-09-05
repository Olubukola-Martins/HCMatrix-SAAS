import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

interface NProps {
  active:
    | "time tracking rules"
    | "Create Work Schedule"
    | "clock in settings"
    | "time off policy"
    | "other settings"
    | "location";
}

export const TimeAttendanceSettingsNav = (props: NProps) => {
  const applyStyle = "text-caramel pb-3";

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 text-center md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-2 Container text-base py-2 border-b mb-6 mt-3">
        <Link
          to={appRoutes.timeTrackingRules}
          className={
            props.active === "time tracking rules"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Time Tracking Rules
        </Link>

        <Link
          to={appRoutes.workSchedule}
          className={
            props.active === "Create Work Schedule"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Create Work Schedule
        </Link>
        <Link
          to={appRoutes.timeOffPolicy}
          className={
            props.active === "time off policy"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Time Off Policy
        </Link>
        <Link
          to={appRoutes.clockInSettings}
          className={
            props.active === "clock in settings"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Clock In Settings
        </Link>
        <Link
          to={appRoutes.location}
          className={
            props.active === "location"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Location
        </Link>
        <Link
          to={appRoutes.otherSettings}
          className={
            props.active === "other settings"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Other Settings
        </Link>
      </div>
    </div>
  );
};
