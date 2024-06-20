import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { scheduleEmployeesShiftProps, scheduleFilterProps } from "../types";

export const QUERY_KEY_FOR_SCHEDULE_EMPLOYEE_SHIFT = "scheduleEmployeesShift";

const getData = async (props: {
  token: string;
  companyId: number;
  pagination?: IPaginationProps;
  filter?: scheduleFilterProps;
}): Promise<{ data: scheduleEmployeesShiftProps[]; total: number }> => {
  const limit = props.pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = props.pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift/employees`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      limit,
      offset,
      empUid: props?.filter?.empUid,
      shiftId: props?.filter?.shiftTypes,
    },
  };

  const res = await axios.get(url, config);

  const fetchedData = res.data.data;

  const result = fetchedData.result;

  const data: scheduleEmployeesShiftProps[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const useGetScheduleEmployeeShift = (props?: {
  pagination?: IPaginationProps;
  filter?: scheduleFilterProps;
}) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_SCHEDULE_EMPLOYEE_SHIFT,
      props?.pagination,
      props?.filter?.empUid,
      props?.filter?.shiftTypes,
    ],
    () =>
      getData({
        token,
        companyId,
        pagination: props?.pagination,
        filter: props?.filter,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
