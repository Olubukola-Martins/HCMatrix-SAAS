import axios from "axios";
import { useQuery } from "react-query";
import { workScheduleFixedProps } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_COMPANY_POLICY = "companyPolicy";

const getData = async (props: ICurrentCompany): Promise<workScheduleFixedProps[]> => {

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/fixed`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);


  
  const data: workScheduleFixedProps[] = res.data.data.map(
    (item: workScheduleFixedProps) => ({
      ...item,
    })
  );

  return data;
};
export const useGetFixedSchedule = () => {
    const {token, companyId} = useApiAuth()
  const queryData = useQuery([QUERY_KEY_FOR_COMPANY_POLICY], () => getData({token, companyId}), {
    onError: (err: any) => {},
    onSuccess: (data) => {},
  });

  return queryData;
};
