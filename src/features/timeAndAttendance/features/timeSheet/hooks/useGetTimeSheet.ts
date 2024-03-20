import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { timeSheetFilterProps, timeSheetProps } from "../types";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_TIME_SHEET = "Time_Sheet";

const getData = async (props: {
  auth: ICurrentCompany;
  pagination?: IPaginationProps;
  filter?: timeSheetFilterProps;
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
      date: props.filter?.date,
      period: props.filter?.period,
      empUid: props.filter?.employeeId,
      startDate: props.filter?.startDate,
      endDate: props.filter?.endDate,
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
export const useGetTimeSheet = ({
  pagination,
  filter,
}: {
  pagination?: IPaginationProps;
  filter?: timeSheetFilterProps;
} = {}) => {
  const { companyId, token } = useApiAuth();
  const { employeeId, endDate, startDate, date, period } = filter ?? {};
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_TIME_SHEET,
      pagination,
      employeeId,
      endDate,
      startDate,
      date,
      period,
    ],
    () =>
      getData({
        auth: { token, companyId },
        pagination: pagination,
        filter: { employeeId, endDate, startDate, date, period },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
