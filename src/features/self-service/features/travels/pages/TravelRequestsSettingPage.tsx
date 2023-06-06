import { PageIntro } from "components/layout/PageIntro";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { appRoutes } from "config/router/paths";
import { TravelRequestSetting } from "../components/TravelRequestSetting";

const TravelRequestsSettingPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Travel Request Settings"
          link={appRoutes.selfServiceHome}
        />
        <TravelRequestSetting />
      </div>
    </>
  );
};

export default TravelRequestsSettingPage;
