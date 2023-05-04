import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { useContext } from "react";
import { useAuthUser } from "react-auth-kit";

export const useApiAuth = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companies = authDetails?.companies;

  const currentCompanyId = globalState.currentCompany?.id as unknown as string;
  const currentCompany = companies.find(
    (item) => item.companyId === +currentCompanyId
  );

  const currentUserEmployeeId = currentCompany?.id as number;
  const companyId = globalState.currentCompany?.id as unknown as string;
  return {
    currentUserEmployeeId,
    token,
    companyId,
  };
};
