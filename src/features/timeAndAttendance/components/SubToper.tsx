import { Link } from "react-router-dom";
import onIndicator from "../assets/images/indicatorOn.svg";
import offIndicator from "../assets/images/offIndicator.svg";
import breakIndicator from "../assets/images/breakIndicate.svg";

export const SubToper = () => {
  return (
    <div className="flex items-start justify-between my-5">
      <div className="flex items-center gap-x-4 text-sm font-medium">
        <Link to="">Timesheet</Link>
        <Link to="">Timeoff</Link>
        <Link to="">Reports</Link>
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
