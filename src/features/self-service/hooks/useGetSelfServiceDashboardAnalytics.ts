import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSelfServiceDBAnalytics } from "../types";

export const QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS =
  "self-service-db-analytics";
const getData = async (
  auth: ICurrentCompany
): Promise<TSelfServiceDBAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TSelfServiceDBAnalytics = res.data.data;

  const data: TSelfServiceDBAnalytics = {
    ...item,
  };

  return data;
};

export const useGetSelfServiceDBAnalytics = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
