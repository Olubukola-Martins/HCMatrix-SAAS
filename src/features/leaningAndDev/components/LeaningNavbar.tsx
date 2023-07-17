import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

interface IProps {
  active: "tracking-progress" | "training" | "reports" | "none-active";
}

export const LeaningNavbar = ({ active }: IProps) => {
  const applyStyle = "text-caramel pb-3";
  return (
    <div className="flex items-center gap-x-4 text-sm font-medium pb-3 pt-5 mb-5 bg-card Container">
      <Link
        to={appRoutes.trackProgress}
        className={
          active === "tracking-progress"
            ? `${applyStyle}`
            : "pb-3 hover:text-caramel"
        }
      >
        Tracking Progress
      </Link>
      <Link
        to={appRoutes.training}
        className={
          active === "training" ? `${applyStyle}` : "pb-3 hover:text-caramel"
        }
      >
        Trainings
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
