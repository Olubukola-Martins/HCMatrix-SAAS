import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { IRequestFilter, ITimeOffProps } from "../types";
import { ICurrentCompany} from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_ALL_TIME_OFF_REQUEST = "GET_ALL_TIME_OFF_REQUEST";


const getData = async (
  auth: ICurrentCompany,
  filter: IRequestFilter
): Promise<{ data: ITimeOffProps[]; total: number }> => {
  const { token, companyId } = auth;
  const { pagination, status, policyId, date } = filter;

  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-off-requests`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": companyId,
    },
    params: {
      limit,
      offset,
      status,
      policyId,
      date,
    },
  };

  const res = await axios.get(url, config);

  const fetchedData = res.data.data;

  const result = fetchedData.result;

  const data: ITimeOffProps[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetAllTimeOffRequest = (filter?: IRequestFilter) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_ALL_TIME_OFF_REQUEST,
      filter?.pagination,
      filter?.status,
      filter?.policyId,
      filter?.date,
    ],
    () =>
      getData(
        { token, companyId },
        { ...filter }
      ),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
