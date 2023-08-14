import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";

const OfferTemplate = () => {
  return (
    <>
      <RecruitmentSettingsIntro
        title="Offer Template"
        description={
          "Offer templates aid in bridging the gap between employee self-onboarding and the application tracking system."
        }
        nextLink={appRoutes.recruitmentJobTemplate}
      />
    </>
  );
};

export default OfferTemplate;
