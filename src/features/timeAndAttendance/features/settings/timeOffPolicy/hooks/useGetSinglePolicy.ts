import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { ITimeOffPolicyRule } from "../types";

export const QUERY_KEY_FOR_SINGLE_POLICY = "singlePolicy";

const getData = async (props: {
  auth: ICurrentCompany;
  id: number;
}): Promise<ITimeOffPolicyRule> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/time-off-policies/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: ITimeOffPolicyRule = res.data.data;
  const data: ITimeOffPolicyRule = {
    ...item,
  };

  return data;
};
export const useGetSinglePolicy = (id: number) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_POLICY, id],
    () => getData({ id, auth: { token, companyId } }),
    {
      enabled: !!id,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
