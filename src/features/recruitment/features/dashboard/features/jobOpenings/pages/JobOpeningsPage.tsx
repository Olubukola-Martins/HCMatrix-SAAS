import RecruitmentSubNav from "features/recruitment/components/RecruitmentSubNav";
import JobOpeningsContainer from "../components/JobOpeningsContainer";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

export const JobOpeningsPage = () => {
  return (
    <>
      <RecruitmentSubNav />

      <div>
        <div className="Container">
          <PageIntro title="Job Openings" link={appRoutes.recruitmentDashboard} />

          <div className="mt-7">
            <JobOpeningsContainer />
          </div>
        </div>
      </div>
    </>
  );
};
