import { PageIntro } from "components/layout/PageIntro";
import React from "react";
import PayrollSubNav from "../components/PayrollSubNav";
import { TaxPoliciesContainer } from "../components/taxPolicies";

const PayrollTaxPoliciesPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Tax policies" />
        <TaxPoliciesContainer />
      </div>
    </>
  );
};

export default PayrollTaxPoliciesPage;
