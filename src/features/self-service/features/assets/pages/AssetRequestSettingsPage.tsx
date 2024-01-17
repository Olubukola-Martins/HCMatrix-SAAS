import { PageIntro } from "components/layout/PageIntro";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { appRoutes } from "config/router/paths";
import { AssetRequestSetting } from "../components/AssetRequestSetting";
import PageSubHeader from "components/layout/PageSubHeader";

const AssetRequestSettingsPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Asset Request Settings"
          link={appRoutes.selfServiceHome}
        />
        <PageSubHeader
          description={`You can now select the workflow approval for asset requisition`}
        />
        <AssetRequestSetting />
      </div>
    </>
  );
};

export default AssetRequestSettingsPage;
