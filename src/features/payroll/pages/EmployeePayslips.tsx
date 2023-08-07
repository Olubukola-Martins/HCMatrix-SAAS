import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { appRoutes } from "config/router/paths";
import { EmployeePayslipsContainer } from "../components/payslips/EmployeePayslipsContainer";

const EmployeePayslips = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Employee Payslips" link={appRoutes.payslips} />
        <EmployeePayslipsContainer />
      </div>
    </>
  );
};

export default EmployeePayslips;
