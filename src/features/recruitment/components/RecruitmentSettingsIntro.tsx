import { PageIntro } from "components/layout/PageIntro";
import { Link } from "react-router-dom";
import { RecruitmentSettingsSubNav } from "./RecruitmentSettingsSubNav";
import { appRoutes } from "config/router/paths";

interface IProps {
  title: string;
  nextLink?: string;
  description: string;
}

export const RecruitmentSettingsIntro = ({
  description,
  title,
  nextLink,
}: IProps) => {
  return (
    <>
    <RecruitmentSettingsSubNav/>
    <div className="Container">
      <div className="flex justify-between">
        <div>
          <PageIntro title={title} link={appRoutes.recruitmentDashboard} />
          <p className="pt-1">{description}</p>
        </div>
        {nextLink ? (
          <div>
            <Link to={nextLink} className="button">
              Next
            </Link>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
    </>
  );
};
