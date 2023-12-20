import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { PensionAdminContainer } from "../components/organizations/pensionAdministrators/PensionAdminContainer";
import { appRoutes } from "config/router/paths";

const PensionAdminsPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro
          title="Pension Administrators"
          link={appRoutes.payrollHome}
        />
        <PensionAdminContainer />
      </div>
    </>
  );
};

export default PensionAdminsPage;
