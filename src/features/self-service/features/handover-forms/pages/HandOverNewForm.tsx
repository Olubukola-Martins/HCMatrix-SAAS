import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React from "react";

import EmployeeHandOverContainer from "../components/EmployeeHandOverContainer";
import { useApiAuth } from "hooks/useApiAuth";
import { useGetExitHandOverForms } from "../hooks/useGetExitHandOverForms";

export const HandOverNewForm = () => {
  const { token, companyId, currentUserEmployeeId } = useApiAuth();
  const { data, isLoading } = useGetExitHandOverForms({
    companyId,
    token,
    employeeId: currentUserEmployeeId,
  });
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <PageIntro
          title="Exit Hand over Form"
          link={appRoutes.selfServiceHome}
        />

        <EmployeeHandOverContainer
          handover={data?.data[0]}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
