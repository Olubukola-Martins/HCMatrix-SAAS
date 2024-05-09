import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { TaxAuthContainer } from "../components/organizations/taxAuthorities/TaxAuthContainer";
import { appRoutes } from "config/router/paths";

const TaxAuthPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Tax Authorities" link={appRoutes.payrollHome} />
        <TaxAuthContainer />
      </div>
    </>
  );
};

export default TaxAuthPage;
