import { useContext } from "react";

import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";

import { EmployeeProfileContainer } from "./EmployeeProfileContainer";

export const MyProfile = () => {
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;

  const companies = authDetails?.companies;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const currentCompanyId = globalState.currentCompany?.id as unknown as string;
  const currentCompany = companies.find(
    (item) => item.companyId === +currentCompanyId
  );

  const employeeId = currentCompany?.id as number;

  return <EmployeeProfileContainer employeeId={+employeeId} />;
};
