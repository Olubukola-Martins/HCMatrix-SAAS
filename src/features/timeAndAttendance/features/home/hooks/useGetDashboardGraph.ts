import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { dashboardGraphProps } from "../types";

export const QUERY_KEY_FOR_DASHBOARD_GRAPH = "dashboardGraph";

const getData = async (
  props: ICurrentCompany
): Promise<dashboardGraphProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/dashboard/graph`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);
  console.log(res);

  const item: dashboardGraphProps = res.data.data;
  const data: dashboardGraphProps = {
    ...item,
  };

  return data;
};
export const useGetDashboardGraph = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_DASHBOARD_GRAPH],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
