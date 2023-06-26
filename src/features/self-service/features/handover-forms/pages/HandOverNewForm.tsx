import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";
import { EmployeeHandOverForm } from "../components/EmployeeHandOverForm";

export const HandOverNewForm = () => {
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <PageIntro
          title="Exit Hand over Form"
          link={appRoutes.selfServiceHome}
        />
        <EmployeeHandOverForm />
      </div>
    </>
  );
};
