import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";

import { useApiAuth } from "hooks/useApiAuth";
import { TGetStartedAnalytics } from "../../types/companyDashboard";

export const QUERY_KEY_FOR_GET_STARTED_ANALYTICS = "get-started-analytics";
const getData = async (
  auth: ICurrentCompany
): Promise<TGetStartedAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/dashboard/get-started`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TGetStartedAnalytics = res.data.data;

  const data: TGetStartedAnalytics = {
    ...item,
  };

  return data;
};

export const useGetStartedAnalytics = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_GET_STARTED_ANALYTICS],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
