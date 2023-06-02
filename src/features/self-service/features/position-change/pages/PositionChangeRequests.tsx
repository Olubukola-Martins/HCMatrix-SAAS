import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import PositionChangeRequestsContainer from "../components/PositionChangeRequestsContainer";

const PositionChangeRequests = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Position Change Requests"
          link={appRoutes.selfServiceHome}
        />
        <PositionChangeRequestsContainer />
      </div>
    </>
  );
};

export default PositionChangeRequests;
