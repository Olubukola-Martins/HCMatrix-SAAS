import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";

const CandidateSource = () => {
  return (
    <>
      <RecruitmentSettingsIntro
        title="Candidate Source"
        description={"Integrate more platform to the system."}
        nextLink={appRoutes.recruitmentEmailTemplate}
      />

    </>
  );
};

export default CandidateSource;
