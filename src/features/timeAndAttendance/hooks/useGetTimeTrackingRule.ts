import axios from "axios";
import { useQuery } from "react-query";
import { ITimeTrackingRule } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_COMPANY_POLICY = "companyPolicy";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<ITimeTrackingRule> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-tracking/policy/${props.companyId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: ITimeTrackingRule = res.data;
  const data: ITimeTrackingRule = {
    ...item,
  };

  return data;
};
export const useGetTimeTrackingRule = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_POLICY],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
