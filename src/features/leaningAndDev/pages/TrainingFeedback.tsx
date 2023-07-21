import { PageIntro } from "components/layout/PageIntro";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { appRoutes } from "config/router/paths";
import { Tabs } from "antd";
import { IndividualFeedback } from "../components/trainings/IndividualFeedback";
import { ReportFeedback } from "../components/trainings/ReportFeedback";

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

        <Tabs
          defaultActiveKey="1"
          className="mt-3 font-medium"
          items={[
            {
              key: "1",
              label: "Individual Feedback",
              children: <IndividualFeedback />,
            },
            {
              key: "2",
              label: "Report Feedback",
              children: <ReportFeedback />,
            },
          ]}
        />
      </div>
    </>
  );
};
