import React from "react";
import { PayrollSchemeContainer } from "../components/payrollSchemes/PayrollSchemeContainer";
import PayrollSubNav from "../components/PayrollSubNav";
import { PageIntro } from "components/layout/PageIntro";

const PayrollSchemesPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Payroll Schemes" />
        <PayrollSchemeContainer />
      </div>
    </>
  );
};

export default PayrollSchemesPage;
