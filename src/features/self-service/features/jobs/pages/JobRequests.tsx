import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import JobRequestsContainer from "../components/JobRequestsContainer";

const JobRequests = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro title="Job Requests" link={appRoutes.selfServiceHome} />
        <JobRequestsContainer />
      </div>
    </>
  );
};

export default JobRequests;
