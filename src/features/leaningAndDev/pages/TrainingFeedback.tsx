import { PageIntro } from "components/layout/PageIntro";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { appRoutes } from "config/router/paths";

export const TrainingFeedback = () => {
  return (
    <>
      <LeaningNavbar active="training" />
      <div className="Container">
        <PageIntro title="Feedback" link={appRoutes.training} />
        <p className="pt-1">
          The table below shows the feedbacks from all employee for the training
          selected
        </p>
      </div>
    </>
  );
};
