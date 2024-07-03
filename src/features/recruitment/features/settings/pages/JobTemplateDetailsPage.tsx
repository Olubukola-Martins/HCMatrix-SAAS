import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { JobTemplateForm } from "../components/JobTemplateForm";

const JobTemplateDetailsPage = () => {
  const handleSubmit = (val: any) => {
    console.log("values of form:", val);
  };
  return (
    <div>
      <RecruitmentSettingsIntro
        description="Set the job name, select its department and enter the job description."
        title="Job Template"
      />
      <JobTemplateForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default JobTemplateDetailsPage;
