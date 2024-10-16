import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TAuthUser } from "../types";

export const QUERY_KEY_FOR_AUTHENTICATED_USER = "authenticated-user";

export const getAuthenticatedUser = async (props: {
  auth: Pick<ICurrentCompany, "token">;
}): Promise<TAuthUser> => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/authenticate/me`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
    },
  };

  const res = await axios.get(url, config);
  const item: TAuthUser = res.data.data;

  const data: TAuthUser = {
    ...item,
  };

  return data;
};

export const useGetAuthUser = () => {
  const { token, authUserData, userCompanies } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_AUTHENTICATED_USER],
    () =>
      getAuthenticatedUser({
        auth: {
          token,
        },
      }),
    {
      enabled: !!token,
      onError: (err: any) => {},
      onSuccess: (data) => {},

      // TODO: Ensure dashboard data uses this hook, make a list of things that will need to make use of this
      // 1. topbar, user profile ?,
      // What needs to invalidate this query, adding a company, company settings, employee , profile, employee & admin home, creating roles, editing roles, creating delegations
      // TODO: Stop Refresh page when logout occurs

      initialData: {
        user: authUserData,
        payload: userCompanies,
      }, //Populate initial data with the stale data from useApiAuth so on initial load data is not empty
    }
  );

  return queryData;
};
