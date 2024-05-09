import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { appRoutes } from "config/router/paths";
import { PageIntro } from "components/layout/PageIntro";
import { ProbationSettings } from "../components/ProbationSettings";

const ProbationSettingsPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro title="Probation Policy" link={appRoutes.settings} />
        <ProbationSettings />
      </div>
    </>
  );
};

export default ProbationSettingsPage;
