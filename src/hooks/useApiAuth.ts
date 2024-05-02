import {
  ROUTES_THAT_REQUIRE_API_REDIRECT_AND_LOGOUT_IF_AUTHENTICATED,
  appRoutes,
} from "config/router/paths";
import { authRoutesDontRequireAuthentication } from "config/router/routes/auth";
import { LOCAL_STORAGE_AUTH_KEY } from "constants/localStorageKeys";
import { IAuthDets } from "features/authentication/types";
import { useContext, useEffect } from "react";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "stateManagers/GlobalContextProvider";

export const useApiAuth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logout = useSignOut();
  const routesAllowedWithoutAuthentication =
    authRoutesDontRequireAuthentication.map((item) => item.path);
  useEffect(() => {
    if (
      localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) !== null &&
      ROUTES_THAT_REQUIRE_API_REDIRECT_AND_LOGOUT_IF_AUTHENTICATED.includes(
        pathname
      )
    ) {
      // logout user if they are accessing a page that requires them to be logged out
      logout();
      return;
    }
    if (
      localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) === null &&
      !routesAllowedWithoutAuthentication.includes(pathname)
    ) {
      // Redirect to login
      navigate(appRoutes.login, { replace: true });
    }
  }, [navigate, pathname, routesAllowedWithoutAuthentication]);
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
  const currentUserId = authDetails?.user?.id;

  const currentUserEmployeeId = currentCompany?.id as number;
  return {
    token,
    companyId,
    currentUserId,
    currentUserEmployeeId,
    currentCompanyEmployeeDetails: currentCompany,
    authUserData,
    userCompanies: companies,
    globalDispatch,
  };
};
