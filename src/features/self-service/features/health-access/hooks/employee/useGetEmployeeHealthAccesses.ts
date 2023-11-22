import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TEmployeeHealthAccess } from "../../types/employee";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  departmentId?: number;
}

export const QUERY_KEY_FOR_EMPLOYEE_HEALTH_ACCESSES =
  "employee-health-accesses";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TEmployeeHealthAccess[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/employee`;

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
      departmentId: props.data?.departmentId,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TEmployeeHealthAccess[] = result.map(
    (item: TEmployeeHealthAccess): TEmployeeHealthAccess => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetEmployeeHealthAccesses = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams, departmentId } = props;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_EMPLOYEE_HEALTH_ACCESSES,
      departmentId,
      pagination,
      searchParams,
    ],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
