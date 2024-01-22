import axios from "axios";
import { useQuery } from "react-query";
import { ITimeTrackingRule } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_ACTIVE_TRACKING_POLICY = "activeTrackingPolicy";

const getData = async (
  token: string,
  companyId: number
): Promise<ITimeTrackingRule> => {

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/time-tracking-policies/get-active`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": companyId,
    },
  };

  const res = await axios.get(url, config);

  const item: ITimeTrackingRule = res.data.data;
  const data: ITimeTrackingRule = {
    ...item,
  };

  return data;
};
export const useGetActiveTrackingPolicy = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_ACTIVE_TRACKING_POLICY],
    () => getData(token, companyId),
    {
      onError: () => {},
      onSuccess: () => {},
    }
  );

  return queryData;
};
