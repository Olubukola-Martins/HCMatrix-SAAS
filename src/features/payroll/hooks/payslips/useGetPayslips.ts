import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayslip } from "features/payroll/types/payslip";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  fromDate?: string;
  toDate?: string;
}

export const QUERY_KEY_FOR_PAYSLIPS = "payslips";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
  scheme:
    | "direct-salary"
    | "office"
    | "wages"
    | { scheme: "project"; projectId: number };
  role: "admin" | "employee";
}): Promise<{ data: TPayslip[]; total: number }> => {
  const { pagination, fromDate, toDate } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  let url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payslip`;
  if (typeof props.scheme === "string") {
    url += `/${props.scheme}/${props.role}`;
  } else {
    url += `/${props.scheme.scheme}/${props.role}?projectId=${props.scheme.projectId}`;
  }

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
      fromDate,
      toDate,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TPayslip[] = result.map(
    (item: TPayslip): TPayslip => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetEmployeePayslips = (data: {
  props: IGetDataProps;
  role: "admin" | "employee";

  scheme:
    | "direct-salary"
    | "office"
    | "wages"
    | { scheme: "project"; projectId: number };
}) => {
  const { token, companyId } = useApiAuth();
  const { props, scheme, role } = data;
  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYSLIPS, scheme, role, pagination, searchParams],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
        scheme,
        role,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
