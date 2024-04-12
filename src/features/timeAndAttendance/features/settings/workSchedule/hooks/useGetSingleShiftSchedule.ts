import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { scheduleEmployeesShiftProps } from "../types";

export const QUERY_KEY_FOR_SINGLE__SHIFT__SCHEDULE = "Single__Shift__Schedule";

const getData = async (props: {
  auth: ICurrentCompany;
  id: number;
}): Promise<scheduleEmployeesShiftProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift/employees/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: scheduleEmployeesShiftProps = res.data.data;
  const data: scheduleEmployeesShiftProps = {
    ...item,
  };

  return data;
};
export const useGetSingleShiftSchedule = (id: number) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE__SHIFT__SCHEDULE, id],
    () => getData({ id, auth: { token, companyId } }),
    {
      enabled: !!id,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
