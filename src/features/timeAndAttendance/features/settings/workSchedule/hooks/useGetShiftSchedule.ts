import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { workScheduleShiftProps } from "../types";

export const QUERY_KEY_FOR_WORK_SCHEDULE_SHIFT = "ShiftWorkSchedule";

const getData = async (
  props: ICurrentCompany
): Promise<workScheduleShiftProps[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);
  
  const data: workScheduleShiftProps[] = res.data.data;

  return data;
};
export const useGetShiftSchedule = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_WORK_SCHEDULE_SHIFT],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
