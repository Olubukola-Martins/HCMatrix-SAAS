import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import RecruitmentSettingSubNav from "../features/settings/components/RecruitmentSettingSubNav";
import { AppButton } from "components/button/AppButton";
import { Link } from "react-router-dom";

interface IRecruitmentSettingsProps {
  title: string;
  description: string;
}

export const RecruitmentSettingsIntro: React.FC<IRecruitmentSettingsProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <RecruitmentSettingSubNav />
      <div className="Container">
        <div className="flex justify-between">
          <div>
            <PageIntro title={title} link={appRoutes.recruitmentDashboard} />
            <p className="pt-1">{description}</p>
          </div>
          {/* {nextLink ? (
            <div>
              <Link to={nextLink} className="button">
                Next
              </Link>
            </div>
          ) : (
            <div />
          )} */}
          <div className="flex gap-5 items-center">
            <Link to={appRoutes.recruitmentDashboard}>
              <AppButton label="Back to Dashbord" type="button" />
            </Link>
            <AppButton label="Next" type="button" variant="transparent" />
          </div>
        </div>
      </div>
    </>
  );
};
