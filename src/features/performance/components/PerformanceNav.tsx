import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

interface NProps {
  active:
    | "balance scorecard"
    | "behavioral core value"
    | "goals/object"
    | "360 degree"
    | "9box"
    | "report";
}

export const PerformanceNav = (props: NProps) => {
  const applyStyle = "border-b-2 text-caramel border-caramel pb-3";

  return (
    <div>
      <div className="flex items-center justify-evenly text-base border-b mb-6 mt-2">
        <Link
          to={appRoutes.balanceScorecard}
          className={
            props.active === "balance scorecard"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Balance Scorecard
        </Link>
        <Link
          to={appRoutes.degreeEvaluation}
          className={
            props.active === "360 degree"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          360 Degree Evaluation
        </Link>
        <Link
          to={appRoutes.behavioralCoreValue}
          className={
            props.active === "behavioral core value"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Behavioral Core value
        </Link>
        <Link
          to={appRoutes.goalsObjective}
          className={
            props.active === "goals/object"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Goals/Objectives
        </Link>
        <Link
          to={appRoutes.nineBox}
          className={
            props.active === "9box"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          9box
        </Link>
        <Link
          to={appRoutes.performanceReport}
          className={
            props.active === "report"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Report
        </Link>
      </div>
    </div>
  );
};
