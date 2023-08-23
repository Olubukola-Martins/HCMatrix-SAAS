import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { PayrollReportAndTempsContainer } from "../components/payrollReports/PayrollReportAndTempsContainer";

const PayReport = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Payroll Reports & Templates" />
        <PayrollReportAndTempsContainer />
      </div>
    </>
  );
};

export default PayReport;
