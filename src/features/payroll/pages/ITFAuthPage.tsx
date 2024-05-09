import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { ITFAuthContainer } from "../components/organizations/itfAuthorities/ITFAuthContainer";
import { appRoutes } from "config/router/paths";

const ITFAuthPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="ITF Authorities" link={appRoutes.payrollHome} />
        <ITFAuthContainer />
      </div>
    </>
  );
};

export default ITFAuthPage;
