import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayrollTemplate } from "features/payroll/types/template";
import { TPayrollReport } from "features/payroll/types/payroll/report";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_PAYROLL_REPORTS = "payroll-reports";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{
  data: TPayrollReport[];
  total: number;
}> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/report`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TPayrollReport[] = result.map(
    (item: TPayrollTemplate): TPayrollTemplate => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetPayrollTemplates = (props: { data: IGetDataProps }) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams } = props.data;
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_REPORTS, pagination, searchParams],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props.data,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
