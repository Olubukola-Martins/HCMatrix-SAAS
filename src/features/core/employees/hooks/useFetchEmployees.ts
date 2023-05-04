import { TFetchListDataExtraProps, TFetchListDataProps } from "types";
import { TEmployee, TEmployeeStatus } from "../types";
import axios from "axios";

import { useQuery } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_OFFSET,
} from "constants/general";

export const QUERY_KEY_FOR_LIST_OF_EMPLOYEES = "employees";

export const getEmployees = async (
  props: TFetchListDataProps & { status?: TEmployeeStatus[] }
): Promise<{ data: TEmployee[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGINATION_LIMIT;
  const offset = pagination?.offset ?? DEFAULT_PAGINATION_OFFSET;

  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      status: props?.status?.toString(),
      search: props?.searchParams?.name,
      limit,
      offset,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TEmployee[] = result.map(
    (item: TEmployee): TEmployee => ({
      ...item,
      // No need as we adhere to same type as backend
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchEmployees = ({
  pagination,
  searchParams,
  onSuccess,
  status,
}: TFetchListDataExtraProps & { status?: TEmployeeStatus[] } & {
  onSuccess?: Function;
} = {}) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_LIST_OF_EMPLOYEES, pagination, status, searchParams?.name],
    () =>
      getEmployees({
        companyId,
        pagination,
        searchParams,

        token,
        status,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {},
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },
    }
  );

  return queryData;
};
