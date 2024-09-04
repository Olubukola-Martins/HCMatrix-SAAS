import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayrollWalletDashboardAnalytics } from "features/payroll/types/wallet";

export const QUERY_KEY_FOR_PAYROLL_WALLET_DB_ANALYTICS =
  "payroll-wallet-dashboard-analytics";
type TParams = {
  type:
    | "bar-chart"
    | "line-chart"
    | "scatter-chart"
    | "waterfall-chart"
    | "pie-chart"
    | "histogram"
    | "area-graph"
    | "spider-chart";
  year?: string;
};
const getData = async (props: {
  auth: ICurrentCompany;
  params: TParams;
}): Promise<TPayrollWalletDashboardAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/wallet/dashboard`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: props.params,
  };

  const res = await axios.get(url, config);
  const data: TPayrollWalletDashboardAnalytics = res.data.data;

  return data;
};

export const useGetPayrollWalletDashboardAnalytics = (params: TParams) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_WALLET_DB_ANALYTICS, params],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        params,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
