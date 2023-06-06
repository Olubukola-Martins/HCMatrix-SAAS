import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import TravelRequestsContainer from "../components/TravelRequestsContainer";

const TravelRequests = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container">
        <PageIntro title="Travel Requests" link={appRoutes.selfServiceHome} />
        <TravelRequestsContainer />
      </div>
    </>
  );
};

export default TravelRequests;
