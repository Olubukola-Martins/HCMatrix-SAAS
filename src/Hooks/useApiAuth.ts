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
  const companyId = globalState.currentCompany?.id as unknown as string;
  return {
    token,
    companyId,
  };
};
