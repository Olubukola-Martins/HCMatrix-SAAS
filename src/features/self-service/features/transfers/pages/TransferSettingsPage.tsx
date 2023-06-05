import { PageIntro } from "components/layout/PageIntro";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { appRoutes } from "config/router/paths";
import { TransferSetting } from "../components/TransfersSetting";

const TransfersSettingPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro title="Transfer Settings" link={appRoutes.selfServiceHome} />
        <TransferSetting />
      </div>
    </>
  );
};

export default TransfersSettingPage;
