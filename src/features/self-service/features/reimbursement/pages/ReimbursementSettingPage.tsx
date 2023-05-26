import { PageIntro } from "components/layout/PageIntro";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { ReimbursmentSetting } from "../components/ReimbursmentSetting";
import { appRoutes } from "config/router/paths";

const ReimbursementSettingPage = () => {
  return (
    <>
      <SelfServiceSubNav />

      <div className="Container ">
        <PageIntro
          title="Reimbursement Settings"
          link={appRoutes.selfServiceHome}
        />
        <ReimbursmentSetting />
      </div>
    </>
  );
};

export default ReimbursementSettingPage;
