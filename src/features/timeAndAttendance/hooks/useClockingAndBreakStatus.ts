import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { ClockingAndBreakStatusProps } from "../types";

export const QUERY_KEY_FOR_CLOCKING_AND_BREAK_STATUS = "ClockingAndBreakStatus";

const getData = async (
  props: ICurrentCompany
): Promise<ClockingAndBreakStatusProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/attendance/status`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: ClockingAndBreakStatusProps = res.data.data;
  const data: ClockingAndBreakStatusProps = {
    ...item,
  };

  return data;
};
export const useClockingAndBreakStatus = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_CLOCKING_AND_BREAK_STATUS],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
