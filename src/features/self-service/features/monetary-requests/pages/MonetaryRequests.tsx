import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import MonetaryRequestsContainer from "../components/MonetaryRequestsContainer";

const MonetaryRequests = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro title="Monetary Requests" link={appRoutes.selfServiceHome} />
        <MonetaryRequestsContainer />
      </div>
    </>
  );
};

export default MonetaryRequests;
