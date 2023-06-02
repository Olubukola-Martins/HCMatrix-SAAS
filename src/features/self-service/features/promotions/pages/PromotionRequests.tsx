import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import PromotionRequestsContainer from "../components/PromotionRequestsContainer";

const PromotionRequests = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Promotion Requests"
          link={appRoutes.selfServiceHome}
        />
        <PromotionRequestsContainer />
      </div>
    </>
  );
};

export default PromotionRequests;
