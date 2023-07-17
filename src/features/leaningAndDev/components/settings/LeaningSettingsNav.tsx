import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

interface NProps {
  active: "training" | "feedback" | "gamification" | "notification";
}

export const LeaningSettingsNav = (props: NProps) => {
  const applyStyle = "text-caramel pb-3";

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 text-center md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-2 Container text-base py-2 border-b mb-6 mt-3">
        <Link
          to={appRoutes.trainingSettings}
          className={
            props.active === "training"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Training Settings
        </Link>

        <Link
          to={appRoutes.feedbackTemplate}
          className={
            props.active === "feedback"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Feedback Template Settings
        </Link>
        <Link
          to={appRoutes.gamification}
          className={
            props.active === "gamification"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Gamification Settings
        </Link>
        <Link
          to={appRoutes.notification}
          className={
            props.active === "notification"
              ? `${applyStyle}`
              : "pb-3 hover:text-caramel"
          }
        >
          Notification Settings
        </Link>
      </div>
    </div>
  );
};
