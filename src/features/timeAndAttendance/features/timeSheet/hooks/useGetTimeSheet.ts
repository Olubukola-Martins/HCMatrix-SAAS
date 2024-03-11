import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { timeSheetProps } from "../types";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_TIME_SHEET = "Time_sheet";

const getData = async (props: {
  auth: ICurrentCompany;
  pagination?: IPaginationProps;
  search?: string;
}): Promise<{ data: timeSheetProps[]; total: number }> => {
  const limit = props.pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = props.pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/attendance/time-sheet-summary`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
      search: props.search,
    },
  };

  const res = await axios.get(url, config);

  const fetchedData = res.data.data;

  const result = fetchedData;

  const data: timeSheetProps[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const useGetTimeSheet = (props?: {
  pagination?: IPaginationProps;
  search?: string;
}) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_TIME_SHEET, props?.pagination, props?.search],
    () =>
      getData({
        auth: { token, companyId },
        pagination: props?.pagination,
        search: props?.search,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
