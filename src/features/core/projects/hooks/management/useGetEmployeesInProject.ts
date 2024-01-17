import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TProjectMember } from "../../types";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_EMPLOYEE_IN_PROJECT = "employee-in-project";

const getData = async (props: {
  projectId?: number;
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TProjectMember[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/project/${props.projectId}/management`;

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

  const data: TProjectMember[] = result.map(
    (item: TProjectMember): TProjectMember => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetEmployeesInProject = (props: {
  data: IGetDataProps;
  projectId?: number;
}) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams } = props.data;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_EMPLOYEE_IN_PROJECT,
      props.projectId,
      pagination,
      searchParams,
    ],
    () =>
      getData({
        auth: { token, companyId },
        projectId: props.projectId,
        data: {
          ...props.data,
        },
      }),
    {
      enabled: !!props.projectId,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
