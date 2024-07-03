import { AppButton } from "components/button/AppButton";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { useState } from "react";
import { RecruitmentEmailsDescription } from "../components/RecruitmentEmailsDescription";
import { RecruitmentMappedVariables } from "../components/RecruitmentMappedVariables.";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { Form } from "antd";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

const additionalEmailTemplates = [
  {
    emailSubject: "UI/UX Designer",
    emailBody: "We are seeking a talented UI/UX Designer.......",
  },
  {
    emailSubject: "Frontend Developer (JS)",
    emailBody: "We are seeking a talented Frontend Developer.......",
  },
  {
    emailSubject: "Mobile Developer",
    emailBody: "We are seeking a talented Mobile Developer.......",
  },
];

export const RecruitmentJobTemplate = () => {
  const [openMappedVariables, setOpenDrawerVariables] =
    useState<boolean>(false);
  return (
    <div>
      <RecruitmentSettingsIntro
        title="Job Template"
        description="Set up your Job template for each designation in all department. Click on the “Add New Template” button to get started."
      />
      <div className="Container">
        <RecruitmentMappedVariables
          handleClose={() => setOpenDrawerVariables(false)}
          open={openMappedVariables}
        />
        <div className="flex p-2 m-1 items-center justify-between">
          <div className="w-1/3">
            <FormDepartmentInput Form={Form} showLabel={false} />
          </div>
          <Link to={appRoutes.recruitmentJobTemplateDetails().path}>
            <AppButton
              label="+ Add Email Template"
              variant="transparent"
              additionalClassNames={["font-bold"]}
            />
          </Link>
        </div>

        {additionalEmailTemplates.map((item) => (
          <RecruitmentEmailsDescription
            emailMessage={item.emailBody}
            emailSubject={item.emailSubject}
            body="Job  Description"
            email="Job Subject"
            linkUrl={appRoutes.recruitmentJobTemplateDetails().path}
          />
        ))}
      </div>
    </div>
  );
};
