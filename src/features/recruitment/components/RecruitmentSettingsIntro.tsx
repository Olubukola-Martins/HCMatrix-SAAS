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
        <div
          className={`flex flex-col justify-between  lg:items-center ${
            description === "" ? "md:flex-row" : "lg:flex-row"
          }`}
        >
          <div>
            <PageIntro title={title} link={appRoutes.recruitmentDashboard} />
            <p className="pt-1">{description}</p>
          </div>
          <div className="flex my-5 lg:my-0 gap-5 items-center">
            <Link to={appRoutes.recruitmentDashboard}>
              <AppButton label="Back to Dashboard" type="button" />
            </Link>
            <AppButton label="Next" type="button" variant="transparent" />
          </div>
        </div>
      </div>
    </>
  );
};
