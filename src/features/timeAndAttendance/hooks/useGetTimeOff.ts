import axios from "axios";
import { useQuery } from "react-query";
import { IAllTimeOff } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_TIME_OFF = "TimeOff";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<IAllTimeOff[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-off/request/${props.companyId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);
  const item: IAllTimeOff[] = res.data;
  return item;
};
export const useGetTimeOff = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_TIME_OFF],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
