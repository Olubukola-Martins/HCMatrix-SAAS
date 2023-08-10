import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { TPayrollListData } from "features/payroll/types/payroll";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  projectId?: number;
}

export const QUERY_KEY_FOR_PAYROLLS_BY_SCHEME = "payrolls-by-scheme";

const getData = async (props: {
  data: IGetDataProps;
  schemeType?: TPayrollSchemeType;
  auth: ICurrentCompany;
}): Promise<{ data: TPayrollListData[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/`;

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
      schemeType: props.schemeType,
      projectId: props?.data?.projectId,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TPayrollListData[] = result.map(
    (item: TPayrollListData): TPayrollListData => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetAllPayrollsByScheme = (props: {
  data: IGetDataProps;
  schemeType?: TPayrollSchemeType;
}) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams } = props.data;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_PAYROLLS_BY_SCHEME,
      props.schemeType,
      props.data.projectId,
      pagination,
      searchParams,
    ],
    () =>
      getData({
        auth: { token, companyId },
        schemeType: props.schemeType,

        data: {
          ...props.data,
        },
      }),
    {
      enabled: !!props.schemeType ? true : false,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
