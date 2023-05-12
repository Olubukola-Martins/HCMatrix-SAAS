import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TLeave } from "../types";
import { TApprovalStatus } from "types/statuses";
import { useApiAuth } from "hooks/useApiAuth";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  employeeId?: number;
  status?: TApprovalStatus;
}

export const QUERY_KEY_FOR_LEAVES = "leaves";

const getLeaves = async (
  props: IGetDataProps & ICurrentCompany
): Promise<{ data: TLeave[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
      employeeId: props.employeeId,
      status: props.status,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TLeave[] = result.map((item: TLeave): TLeave => ({ ...item }));

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchLeaves = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_LEAVES, props],
    () =>
      getLeaves({
        ...props,
        token,
        companyId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
