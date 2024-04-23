import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { dashboardGraphProps, graphFilterProps } from "../types";

export const QUERY_KEY_FOR_DASHBOARD_GRAPH = "dashboardGraph";

const getData = async (
  props: ICurrentCompany,
  params: graphFilterProps
): Promise<dashboardGraphProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/dashboard/graph`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: { year: params.year, month: params.month, week: params.week },
  };
  const res = await axios.get(url, config);

  const item: dashboardGraphProps = res.data.data;
  const data: dashboardGraphProps = {
    ...item,
  };

  return data;
};
export const useGetDashboardGraph = (params: graphFilterProps) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_DASHBOARD_GRAPH, params],
    () => getData({ token, companyId }, params),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
