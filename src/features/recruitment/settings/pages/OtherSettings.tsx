import { ExperienceType } from "./ExperienceType";
import { JobStatusSettings } from "./JobStatusSettings";
import { EmploymentType } from "./EmploymentType";
import { Tabs } from "antd";
import { RecruitmentNotification } from "features/recruitment/settings/pages/RecruitmentNotification";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { Benefits } from "./Benefits";

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
