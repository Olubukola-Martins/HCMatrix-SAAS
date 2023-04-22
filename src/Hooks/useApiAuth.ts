import { IAuthDets } from "features/authentication/types";
import { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { GlobalContext } from "stateManagers/GlobalContextProvider";

export const useApiAuth = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails?.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = +(globalState.currentCompany?.id as unknown as string); // make a number
  const companies = authDetails?.companies;

  const currentCompanyId = globalState.currentCompany?.id as unknown as string;

  const currentCompany = companies.find(
    (item) => item.companyId === +currentCompanyId
  );

  const currentUserEmployeeId = currentCompany?.id as number;
  return {
    token,
    companyId,
    currentUserEmployeeId,
  };
};
