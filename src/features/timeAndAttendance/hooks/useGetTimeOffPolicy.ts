import axios from "axios";
import { useQuery } from "react-query";
import { ITimeOffPolicyRule } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_TIME_OFF_POLICY = "TimeOffPolicy";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<ITimeOffPolicyRule> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-off/policy/${props.companyId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);
  console.log("hhhhh", res);
  const item: ITimeOffPolicyRule = res.data;
  const data: ITimeOffPolicyRule = {
    ...item,
  };

  return data;
};
export const useGetTimeOffPolicy = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_TIME_OFF_POLICY],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
