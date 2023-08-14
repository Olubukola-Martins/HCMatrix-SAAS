import { Tabs } from "antd";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { Benefits } from "../components/Benefits";
import { EmploymentType } from "../components/EmploymentType";
import { ExperienceType } from "../components/ExperienceType";
import { JobStatusSettings } from "../components/JobStatusSettings";
import { RecruitmentNotification } from "../components/RecruitmentNotification";

const OtherSettings = () => {
  return (
    <>
      <RecruitmentSettingsIntro title="Other Settings" description={""} />
      <div className="Container">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Benefits",
              children: <Benefits />,
              key: "1",
            },
            {
              label: "Employment Type",
              children: <EmploymentType />,
              key: "2",
            },
            {
              label: "Experience Type",
              children: <ExperienceType />,
              key: "3",
            },
            {
              label: "Job Status",
              children: <JobStatusSettings />,
              key: "4",
            },
            {
              label: "Notifications",
              children: <RecruitmentNotification />,
              key: "5",
            },
          ]}
        />
      </div>
    </>
  );
};

export default OtherSettings;
