import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import CRBCards from "../components/CRBCards";
import CRBHeader from "../components/CRBHeader";

import CRBTabsContainer from "../components/tabs/CRBTabsContainer";
import { appRoutes } from "config/router/paths";

export const CRBHomePage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div>
        <div className="Container">
          <CRBHeader
            title="Conference Rooms"
            backLink={appRoutes.selfServiceHome}
          />
          <CRBCards />
          <div className="mt-12 flex flex-col gap-4">
            <CRBTabsContainer />{" "}
          </div>
        </div>
      </div>
    </>
  );
};
