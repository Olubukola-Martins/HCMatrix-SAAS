import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { NSITFAuthContainer } from "../components/organizations/nsitfAuthorities/NSITFAuthContainer";
import { appRoutes } from "config/router/paths";

const NSITFAuthPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="NSITF Authorities" link={appRoutes.payrollHome} />
        <NSITFAuthContainer />
      </div>
    </>
  );
};

export default NSITFAuthPage;
