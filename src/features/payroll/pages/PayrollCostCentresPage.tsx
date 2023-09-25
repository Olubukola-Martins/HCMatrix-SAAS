import React from "react";
import { CostCentreContainer } from "../components/costCentres";
import PayrollSubNav from "../components/PayrollSubNav";
import { PageIntro } from "components/layout/PageIntro";

const PayrollCostCentresPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Cost Centres" />
        <CostCentreContainer />
      </div>
    </>
  );
};

export default PayrollCostCentresPage;
