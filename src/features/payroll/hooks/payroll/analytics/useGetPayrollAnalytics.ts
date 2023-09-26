import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayrollAnalyticsItem } from "features/payroll/types/payroll";

export const QUERY_KEY_FOR_PAYROLL_ANALYTICS = "payroll-analytics";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TPayrollAnalyticsItem> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/analytic/`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TPayrollAnalyticsItem = res.data.data;

  const data: TPayrollAnalyticsItem = {
    ...item,
  };

  return data;
};

export const useGetPayrollAnalytics = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_ANALYTICS],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
