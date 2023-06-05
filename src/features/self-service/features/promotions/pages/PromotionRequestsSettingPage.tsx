import { PageIntro } from "components/layout/PageIntro";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { appRoutes } from "config/router/paths";
import { PromotionRequestSetting } from "../components/PromotionRequestSetting";

const PromotionRequestsSettingPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Promotion Request Settings"
          link={appRoutes.selfServiceHome}
        />
        <PromotionRequestSetting />
      </div>
    </>
  );
};

export default PromotionRequestsSettingPage;
