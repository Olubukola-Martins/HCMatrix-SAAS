import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { PensionAdminContainer } from "../components/pensionAdministrators/PensionAdminContainer";

const PensionAdminsPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Pension Administrators" />
        <PensionAdminContainer />
      </div>
    </>
  );
};

export default PensionAdminsPage;
