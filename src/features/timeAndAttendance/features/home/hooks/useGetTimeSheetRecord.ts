import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { timeSheetRecordProps } from "../types";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_TIME_SHEET = "Time_Sheet";

const getData = async (props: {
  auth: ICurrentCompany;
  pagination?: IPaginationProps;
}): Promise<{ data: timeSheetRecordProps[]; total: number }> => {
  const limit = props.pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = props.pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/attendance/time-sheet`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
    },
  };

  const res = await axios.get(url, config);

  console.log(res);
  
  const fetchedData = res.data.data.result;

  const result = fetchedData;

  const data: timeSheetRecordProps[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const useGetTimeSheetRecord = ({
  pagination,
}: {
  pagination?: IPaginationProps;
} = {}) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_TIME_SHEET, pagination],
    () =>
      getData({
        auth: { token, companyId },
        pagination: pagination,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
