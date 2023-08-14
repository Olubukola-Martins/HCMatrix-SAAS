import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";

const JobTemplate = () => {
  return (
    <>
      <RecruitmentSettingsIntro
        title="Job Template"
        description={
          "Customize email templates to send to candidates on your ATS."
        }
        nextLink={appRoutes.recruitmentOtherSettings}
      />
    </>
  );
};

export default JobTemplate;
