import { PageIntro } from "components/layout/PageIntro";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { appRoutes } from "config/router/paths";
import { JobRequestSetting } from "../components/JobRequestSetting";

const JobRequestsSettingPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Job Request Settings"
          link={appRoutes.selfServiceJob}
        />
        <JobRequestSetting />
      </div>
    </>
  );
};

export default JobRequestsSettingPage;
