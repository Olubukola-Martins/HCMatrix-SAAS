import { AppButton } from "components/button/AppButton";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { useState } from "react";
import { RecruitmentEmailsDescription } from "../components/RecruitmentEmailsDescription";
import { RecruitmentMappedVariables } from "../components/RecruitmentMappedVariables.";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

export const RecruitmentOfferTemplate = () => {
  const [openMappedVariables, setOpenDrawerVariables] =
    useState<boolean>(false);
  return (
    <div>
      <RecruitmentSettingsIntro
        title="Offer Template"
        description="Offer templates aid in bridging the gap between employee self-onboarding and the application tracking system."
      />
      <div className="Container">
        <RecruitmentMappedVariables
          handleClose={() => setOpenDrawerVariables(false)}
          open={openMappedVariables}
          showPanelistName={false}
        />
        <div className="flex gap-8 p-3 m-2 items-center">
          <button
            className="underline underline-offset-8 text-caramel font-bold"
            onClick={() => {
              setOpenDrawerVariables(true);
            }}
          >
            Mapped Variables
          </button>
          <Link to={appRoutes.recruitmentOfferTemplateDetails().path}>
            <AppButton
              label="+ Add Offer Template"
              variant="transparent"
              additionalClassNames={["font-bold"]}
            />
          </Link>
        </div>
        <p className="px-4 pb-3">
          This email template will automatically be sent to applicants when they
          submit an application.
        </p>
        <RecruitmentEmailsDescription
          emailMessage="Thank you for applying at ... "
          emailSubject="Full Time - At Will"
          body=""
          email=""
          linkUrl={appRoutes.recruitmentEmailTemplateDetails().path}
        />
      </div>
    </div>
  );
};
