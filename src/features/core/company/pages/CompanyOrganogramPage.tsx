import React from "react";
import CompanyOrganogram from "../components/CompanyOrganogram";
import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

const CompanyOrganogramPage = () => {
  return (
    <div className="Container">
      {
        <div className="mt-4">
          <PageIntro title="Company Organogram" link={appRoutes.home} />

          <CompanyOrganogram />
        </div>
      }
    </div>
  );
};

export default CompanyOrganogramPage;
