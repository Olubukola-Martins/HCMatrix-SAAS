import { PageIntro } from "components/layout/PageIntro";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { appRoutes } from "config/router/paths";
import { MonetaryRequestSetting } from "../components/MonetaryRequestSetting";

const MonetaryRequestsSettingPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Monetary Request Settings"
          link={appRoutes.selfServiceMonetary}
        />
        <MonetaryRequestSetting />
      </div>
    </>
  );
};

export default MonetaryRequestsSettingPage;
