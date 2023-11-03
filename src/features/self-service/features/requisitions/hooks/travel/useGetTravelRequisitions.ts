import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TApprovalStatus } from "types/statuses";
import { TTravelRequest } from "../../types/travel";

interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TApprovalStatus[] | TApprovalStatus;

  employeeId?: number;
}

export const QUERY_KEY_FOR_TRAVEL_REQUESTS = "travel-requests";

const getData = async (
  props: IGetDataProps
): Promise<{ data: TTravelRequest[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/travel`;

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
      status:
        typeof props.status === "string"
          ? props.status
          : props.status?.join(","),
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TTravelRequest[] = result.map(
    (item: TTravelRequest): TTravelRequest => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetTravelRequisitions = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_TRAVEL_REQUESTS, props],
    () =>
      getData({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
