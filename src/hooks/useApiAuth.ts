import { appRoutes } from "config/router/paths";
import { LOCAL_STORAGE_AUTH_KEY } from "constants/localStorageKeys";
import { IAuthDets } from "features/authentication/types";
import { useContext, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "stateManagers/GlobalContextProvider";

export const useApiAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) === null) {
      // Redirect to login
      navigate(appRoutes.login, { replace: true });
    }
  }, [navigate]);
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;
  const authUserData = authDetails?.user;

  const token = authDetails?.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch: globalDispatch } = globalCtx;
  const companyId = +(globalState.currentCompany?.id as unknown as string); // make a number
  const companies = authDetails?.companies;

  const currentCompanyId = globalState.currentCompany?.id as unknown as string;

  const currentCompany = companies?.find(
    (item) => item.companyId === +currentCompanyId
  );

  const currentUserEmployeeId = currentCompany?.id as number;
  return {
    token,
    companyId,
    currentUserEmployeeId,
    currentCompanyEmployeeDetails: currentCompany,
    authUserData,
    userCompanies: companies,
    globalDispatch,
  };
};
