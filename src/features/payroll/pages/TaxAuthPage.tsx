import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { TaxAuthContainer } from "../components/taxAuthorities/TaxAuthContainer";

const TaxAuthPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Tax Authorities" />
        <TaxAuthContainer />
      </div>
    </>
  );
};

export default TaxAuthPage;
