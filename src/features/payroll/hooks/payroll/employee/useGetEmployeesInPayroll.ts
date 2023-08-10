import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TEmployeesInPayrollData } from "features/payroll/types";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  eligibility?: "citizen" | "expatriate";
  isActive?: boolean;
}

export const QUERY_KEY_FOR_EMPLOYEES_IN_PAYROLL = "employees-in-payroll";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
  payrollId?: number;
}): Promise<{ data: TEmployeesInPayrollData[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.payrollId}/employee`;

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
      isActive: props.data.isActive,
      eligibility: props.data.eligibility,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TEmployeesInPayrollData[] = result.map(
    (item: TEmployeesInPayrollData): TEmployeesInPayrollData => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetEmployeesInPayroll = (props: {
  data: IGetDataProps;
  payrollId?: number;
}) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams } = props.data;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_EMPLOYEES_IN_PAYROLL,
      props.payrollId,
      props.data.eligibility,
      props.data.isActive,
      pagination,
      searchParams,
    ],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props.data,
        },
        payrollId: props.payrollId,
      }),
    {
      enabled: !!props.payrollId,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
