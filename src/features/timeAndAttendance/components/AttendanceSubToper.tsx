import { Link } from "react-router-dom";
import onIndicator from "../assets/images/indicatorOn.svg";
import offIndicator from "../assets/images/offIndicator.svg";
import breakIndicator from "../assets/images/breakIndicate.svg";
import { appRoutes } from "config/router/paths";

export const AttendanceSubToper = () => {
  return (
    <div className="flex items-center justify-between py-3 mb-5 bg-card Container">
      <div className="flex items-center gap-x-4 text-sm font-medium">
        <Link to={appRoutes.timeSheet}>Timesheet</Link>
        <Link to={appRoutes.timeOff}>Timeoff</Link>
        <Link to={appRoutes.attendanceReport}>Reports</Link>
      </div>
      <div className="flex items-center gap-x-4 mt-2">
        <span>2:24:32</span>
        <img src={onIndicator} alt="on indicator" />
        <img src={breakIndicator} alt="break indicator" />
        <img src={offIndicator} alt="off indicator" />
      </div>
    </div>
  );
};
