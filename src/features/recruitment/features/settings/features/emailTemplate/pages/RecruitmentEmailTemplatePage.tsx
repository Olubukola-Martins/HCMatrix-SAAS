import { AppButton } from "components/button/AppButton";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { useState } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { RecruitmentEmailsDescription } from "../../../components/RecruitmentEmailsDescription";
import { RecruitmentMappedVariables } from "../../../components/RecruitmentMappedVariables.";
import { additionalEmailTemplates } from "../constants";

const RecruitmentEmailTemplatePage = () => {
  const [openMappedVariables, setOpenDrawerVariables] =
    useState<boolean>(false);

  // const [isNewTemplate, setIsNewTemplate] = useState<boolean>(false);
  return (
    <div>
      <RecruitmentSettingsIntro
        title="Email Template"
        description="Customize email templates to send to candidates. Variables are being matched to help streamline your application. Click on “Mapped Variables” button to view."
      />
      <div className="Container">
        <RecruitmentMappedVariables
          handleClose={() => setOpenDrawerVariables(false)}
          open={openMappedVariables}
          showPanelistName={true}
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
          <Link to={appRoutes.recruitmentEmailTemplateDetails().path}>
            <AppButton
              label="+ Add Email Template"
              variant="transparent"
              // handleClick={() => setIsNewTemplate(true)}
            />
          </Link>
        </div>
        <p className="px-4 pb-3">
          This email template will automatically be sent to applicants when they
          submit an application.
        </p>
        <RecruitmentEmailsDescription
          emailMessage="Thank you for applying at ... "
          emailSubject="Application Confirmation Email"
          candidateStatus="Applied"
          body="Email Message -:"
          email="Email Subject -:"
          linkUrl={appRoutes.recruitmentEmailTemplateDetails().path}
        />
        <p className="px-4 border-b pb-2">
          These are additional email templates required by a candidate or
          application selection.
        </p>
        {additionalEmailTemplates.map((item, i) => (
          <RecruitmentEmailsDescription
            key={i}
            body="Email Message -:"
            email="Email Subject -:"
            emailMessage={item.emailBody}
            emailSubject={item.emailSubject}
            linkUrl={appRoutes.recruitmentEmailTemplateDetails().path}
          />
        ))}
      </div>
      {/* {isNewTemplate && (
        <EmailTemplateDetailsPage isNewTemplate={isNewTemplate} />
      )} */}
    </div>
  );
};

export default RecruitmentEmailTemplatePage;
