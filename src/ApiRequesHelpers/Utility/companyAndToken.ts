import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { useContext } from "react";
import { useAuthUser } from "react-auth-kit";

const auth = useAuthUser();
const authDetails = auth() as unknown as IAuthDets;
export const token = authDetails.userToken;
const globalCtx = useContext(GlobalContext);
const { state: globalState } = globalCtx;
export const companyId = globalState.currentCompany?.id as unknown as string;