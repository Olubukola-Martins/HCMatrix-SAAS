import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { Tabs } from "antd";
import { Overview } from "../components/trainings/Overview";
import { UpdateTraining } from "../components/trainings/UpdateTraining";

export const TrainingDetails = () => {
  return (
    <>
      <LeaningNavbar active="training" />

      <div className="Container">
        <PageIntro title="Training Details" link={appRoutes.training} />
        <Tabs
          defaultActiveKey="1"
          className="mt-2"
          items={[
            {
              key: "1",
              label: "Overview",
              children: (
                <>
                  <Overview />
                </>
              ),
            },
            {
              key: "2",
              label: "Training Content",
              children: <>Training Content</>,
            },
            {
              key: "3",
              label: "Users",
              children: <>Users</>,
            },
            {
              key: "4",
              label: "Update Training",
              children: (
                <>
                  <UpdateTraining />
                </>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};
