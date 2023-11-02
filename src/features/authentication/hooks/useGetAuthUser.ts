import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TAuthUser } from "../types";

export const QUERY_KEY_FOR_AUTHENTICATED_USER = "authenticated-user";

const getData = async (props: {
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
  const { token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_AUTHENTICATED_USER],
    () =>
      getData({
        auth: {
          token,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
