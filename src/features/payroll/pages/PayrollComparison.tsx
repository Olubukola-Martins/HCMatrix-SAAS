import React, { useState } from "react";
import PayrollSubNav from "../components/PayrollSubNav";

import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

import PageSubHeader from "components/layout/PageSubHeader";

import { ComparismContainer } from "../components/payrollComparism/ComparismContainer";

const PayrollComparison = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container flex flex-col gap-2">
        <PageIntro title="Payroll Comparison" link={appRoutes.payrollHome} />

        <ComparismContainer />
      </div>
    </>
  );
};

export default PayrollComparison;
