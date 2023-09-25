import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import {
  TPayrollGraphAnalyticsItemType,
  TPayrollGraphAnalyticsItem,
} from "features/payroll/types/payroll";
import { TPayrollGraphAnalyticsItem4Waterfall } from "features/payroll/types/payroll/analytics";

interface IDataProps {
  type: TPayrollGraphAnalyticsItemType;
  year?: string;
}
export const QUERY_KEY_FOR_PAYROLL_GRAPH_ANALYTICS = "payroll-graph-analytics";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<
  TPayrollGraphAnalyticsItem | TPayrollGraphAnalyticsItem4Waterfall
> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/analytic/graph`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      type: props.data.type,
      year: props.data.year,
    },
  };

  const res = await axios.get(url, config);
  const item:
    | TPayrollGraphAnalyticsItem
    | TPayrollGraphAnalyticsItem4Waterfall = res.data.data;

  const data =
    props.data.type === "waterfall-chart"
      ? (item as TPayrollGraphAnalyticsItem4Waterfall)
      : (item as TPayrollGraphAnalyticsItem);

  return data;
};

export const useGetPayrollGraphAnalytics = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_GRAPH_ANALYTICS],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
