import axios from "axios";
import { useQuery } from "react-query";
import { ITimeTrackingRule } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { GetToken } from "hooks/GetToken";

export const QUERY_KEY_FOR_COMPANY_POLICY = "companyPolicy";

const getData = async (): Promise<ITimeTrackingRule> => {
  const {token, companyId} = GetToken()

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/time-tracking-policies`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": companyId,
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
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_POLICY],
    () => getData(),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
