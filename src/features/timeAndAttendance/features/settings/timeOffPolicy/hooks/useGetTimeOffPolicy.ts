import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ITimeOffPolicyRule } from "../types";

export const QUERY_KEY_FOR_TIME_OFF_POLICY = "timeOffPolicy";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<ITimeOffPolicyRule[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/time-off-policies`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: ITimeOffPolicyRule[] = res.data.data.result;
  return item;
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
