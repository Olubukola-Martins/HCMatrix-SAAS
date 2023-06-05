import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";

import { RequisitionSetting } from "../components/RequisitionSetting";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

const Requisition = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container">
        <PageIntro
          title="Requisition Settings"
          link={appRoutes.selfServiceHome}
        />
        <RequisitionSetting />
      </div>
    </>
  );
};

export default Requisition;
