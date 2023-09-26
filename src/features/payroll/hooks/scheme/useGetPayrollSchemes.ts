import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayrollSchemeListItem } from "features/payroll/types/payrollSchemes/payrollSchemeList";

export const QUERY_KEY_FOR_PAYROLL_SCHEMES = "payroll-schemes";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<{ data: TPayrollSchemeListItem[]; total: number }> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/scheme/`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TPayrollSchemeListItem[] = result.map(
    (item: TPayrollSchemeListItem): TPayrollSchemeListItem => ({ ...item })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetPayrollSchemes = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_SCHEMES],
    () =>
      getData({
        auth: { token, companyId },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
