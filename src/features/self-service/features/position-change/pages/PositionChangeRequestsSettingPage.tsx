import { PageIntro } from "components/layout/PageIntro";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { appRoutes } from "config/router/paths";
import { PositionChangeRequestSetting } from "../components/PositionChangeRequestSetting";

const PositionChangeRequestsSettingPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Position Change Request Settings"
          link={appRoutes.selfServicePositionChange}
        />
        <PositionChangeRequestSetting />
      </div>
    </>
  );
};

export default PositionChangeRequestsSettingPage;
