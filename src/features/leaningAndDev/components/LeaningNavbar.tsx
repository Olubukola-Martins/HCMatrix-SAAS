import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

interface IProps {
  active: "time-sheet" | "time-off" | "reports" | "none-active";
}

export const LeaningNavbar = ({ active }: IProps) => {
  const applyStyle = "text-caramel pb-3";
  return (
    <div className="flex items-center gap-x-4 text-sm font-medium py-3 mb-5 bg-card Container">
      <Link
        to={appRoutes.timeSheet}
        className={
          active === "time-sheet" ? `${applyStyle}` : "pb-3 hover:text-caramel"
        }
      >
        Timesheet
      </Link>
      <Link
        to={appRoutes.timeOff}
        className={
          active === "time-off" ? `${applyStyle}` : "pb-3 hover:text-caramel"
        }
      >
        Timeoff
      </Link>
      <Link
        to={appRoutes.shiftPerEmployee}
        className={
          active === "reports" ? `${applyStyle}` : "pb-3 hover:text-caramel"
        }
      >
        Reports
      </Link>
    </div>
  );
};
