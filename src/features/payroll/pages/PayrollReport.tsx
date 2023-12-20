import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { PayrollReportAndTempsContainer } from "../components/payrollReports/PayrollReportAndTempsContainer";
import { appRoutes } from "config/router/paths";

const PayReport = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Payroll Reports & Templates"
          link={appRoutes.payrollHome}
        />
        <PayrollReportAndTempsContainer />
      </div>
    </>
  );
};

export default PayReport;
