import { IAuthDets } from "features/authentication/types";
import { useContext, useEffect } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "stateManagers/GlobalContextProvider";

export const useApiAuth = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated() || localStorage.getItem("hcmatrix_app")) {
      // Redirect to Dashboard
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, isAuthenticated]);
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;
  const authUserData = authDetails?.user;

  const token = authDetails?.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
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
  };
};
