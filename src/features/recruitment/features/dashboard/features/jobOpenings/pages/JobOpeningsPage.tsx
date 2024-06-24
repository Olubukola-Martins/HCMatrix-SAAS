import RecruitmentSubNav from "features/recruitment/components/RecruitmentSubNav";
import JobOpeningsContainer from "../components/JobOpeningsContainer";
import { PageIntro } from "components/layout/PageIntro";

export const JobOpeningsPage = () => {
  return (
    <>
      <RecruitmentSubNav />

      <div>
        <div className="Container">
          <PageIntro title="Job Openings" />

          <div className="">
            <JobOpeningsContainer />
          </div>
        </div>
      </div>
    </>
  );
};
