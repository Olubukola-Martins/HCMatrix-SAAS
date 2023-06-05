import { PageIntro } from "components/layout/PageIntro";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { appRoutes } from "config/router/paths";
import { AssetRequestSetting } from "../components/AssetRequestSetting";

const AssetRequestSettingsPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Asset Request Settings"
          link={appRoutes.selfServiceHome}
        />
        <AssetRequestSetting />
      </div>
    </>
  );
};

export default AssetRequestSettingsPage;
