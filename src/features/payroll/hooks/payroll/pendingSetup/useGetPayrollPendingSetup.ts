import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayrollPendingSetup } from "features/payroll/types/payroll/pendingSetup";

export const QUERY_KEY_FOR_PAYROLL_PENDING_SETUP = "payroll-pending-setup";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TPayrollPendingSetup> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/analytic/`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TPayrollPendingSetup = res.data.data;

  const data: TPayrollPendingSetup = {
    ...item,
  };

  return data;
};

export const useGetPayrollPendingSetup = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_PENDING_SETUP],
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
