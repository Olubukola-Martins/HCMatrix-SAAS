import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { workScheduleWeeklyProps } from "../types";

export const QUERY_KEY_FOR_WORK_SCHEDULE_WEEKLY = "WeeklyWorkSchedule";

const getData = async (
  props: ICurrentCompany
): Promise<workScheduleWeeklyProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/weekly`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);

  const data: workScheduleWeeklyProps = res.data.data;

  return data;
};
export const useGetWeeklySchedule = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_WORK_SCHEDULE_WEEKLY],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
