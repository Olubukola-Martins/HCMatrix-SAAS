import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import {
  TTaskPriority,
  TTaskStatus,
  TTask,
} from "features/self-service/features/tasks/types";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  priority?: TTaskPriority[];
  status?: TTaskStatus[];
}

export const QUERY_KEY_FOR_TASKS_ASSIGNED_BY_EMPLOYEE =
  "tasks-assigned-by-employee";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TTask[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/task/assignee`;

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
      priority: props.data.priority?.join(","),
      status: props.data.status?.join(","),
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TTask[] = result.map((item: TTask): TTask => ({ ...item }));

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetLeaveCycles = (props: IGetDataProps = {}) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams, priority, status } = props;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_TASKS_ASSIGNED_BY_EMPLOYEE,
      pagination,
      searchParams,
      priority,
      status,
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
