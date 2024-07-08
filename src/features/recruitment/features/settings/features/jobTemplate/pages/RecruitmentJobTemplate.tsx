import { AppButton } from "components/button/AppButton";
import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
import { useState } from "react";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
import { Form } from "antd";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";
import { RecruitmentEmailsDescription } from "../../../components/RecruitmentEmailsDescription";
import { RecruitmentMappedVariables } from "../../../components/RecruitmentMappedVariables.";
import { additionalJobTemplates } from "../constants";

export const RecruitmentJobTemplate = () => {
  const [openMappedVariables, setOpenDrawerVariables] =
    useState<boolean>(false);
  return (
    <div className="Container">
      <RecruitmentSettingsIntro
        title="Job Template"
        description="Set up your Job template for each designation in all department. Click on the “Add New Template” button to get started."
      />
      <div>
        <RecruitmentMappedVariables
          handleClose={() => setOpenDrawerVariables(false)}
          open={openMappedVariables}
        />
        <div className="flex flex-col md:flex-row p-2 m-1 justify-between">
          <div className="md:w-1/3">
            <FormDepartmentInput Form={Form} showLabel={false} />
          </div>
          <div>
            <Link to={appRoutes.recruitmentJobTemplateDetails().path}>
              <AppButton label="+ Add Email Template" variant="transparent" />
            </Link>
          </div>
        </div>

        {additionalJobTemplates.map((item) => (
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
