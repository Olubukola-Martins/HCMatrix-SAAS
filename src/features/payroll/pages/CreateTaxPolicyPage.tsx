import { PageIntro } from "components/layout/PageIntro";
import React from "react";
import { TaxPolicyCreator } from "../components/taxPolicies";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";

const CreateTaxPolicyPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Create Tax Policy"
          link={appRoutes.payrollTaxPolicies}
        />
        <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
          <TaxPolicyCreator />
        </div>
      </div>
    </>
  );
};

export default CreateTaxPolicyPage;
