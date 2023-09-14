import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { PayslipsContainer } from "../components/payslips/PayslipsContainer";

const EmployeePayslips = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Employee Payslips" link={appRoutes.payslips} />
        <PayslipsContainer role="admin" defaultScheme="office" />
      </div>
    </>
  );
};

export default EmployeePayslips;
