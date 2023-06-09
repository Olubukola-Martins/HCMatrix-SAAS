import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { ResignationSetting } from "../components/ResignationSettings";
import { appRoutes } from "config/router/paths";
import { PageIntro } from "components/layout/PageIntro";

const ResignationSettingsPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro title="Resignation Policy" link={appRoutes.settings} />
        <ResignationSetting />
      </div>
    </>
  );
};

export default ResignationSettingsPage;
