import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { TransfersContainer } from "../components/TransfersContainer";

const Transfers = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro title="Transfers" link={appRoutes.selfServiceHome} />
        <TransfersContainer />
      </div>
    </>
  );
};

export default Transfers;
