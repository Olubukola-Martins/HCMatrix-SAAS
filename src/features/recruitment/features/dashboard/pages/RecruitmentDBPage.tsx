import RecruitmentSubNav from "features/recruitment/components/RecruitmentSubNav";
import ApplicantDetailsCard from "../components/ApplicantDetailsCard";
import ApplicationReceivedByDepartmentCard from "../components/ApplicationReceivedByDepartmentCard";
import EmploymentTypeAnalyticsCard from "../components/EmploymentTypeAnalyticsCard";
import RecruitmentDBCards from "../components/RecruitmentDBCards";
import RecruitmentDBChatsCard from "../components/RecruitmentDBChatsCard";

// TODO: Recruitment:: Link to paths and routes, the child components should be properly fleshed out as well
const RecruitmentDBPage = () => {
  return (
    <>
      <RecruitmentSubNav />
      <div className="Container">
        <div className="grid">
          {/* // TODO: Recruitment:: Style text below to match design */}
          <h3>Welcome to the recruitment module</h3>
          {/* <div >
            <RecruitmentDBCards title="Hey" count={0} link={""} />
            <RecruitmentDBCards title="Hello" count={0} link={""} />
          </div>
          <EmploymentTypeAnalyticsCard />
          <ApplicationReceivedByDepartmentCard /> */}
          <ApplicantDetailsCard />
          {/* <RecruitmentDBChatsCard /> */}
        </div>
      </div>
    </>
  );
};

export default RecruitmentDBPage;
