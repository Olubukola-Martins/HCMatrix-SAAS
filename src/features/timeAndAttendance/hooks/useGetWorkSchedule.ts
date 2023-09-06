import axios from "axios";
import { useQuery } from "react-query";
import { workScheduleProps } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_WORK_SCHEDULE = "worksSchedule";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<workScheduleProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/work-schedule/policy/${props.companyId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: workScheduleProps = res.data;
  const data: workScheduleProps = {
    ...item,
  };

  return data;
};
export const useGetWorkSchedule = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_WORK_SCHEDULE],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
