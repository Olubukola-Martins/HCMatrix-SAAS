import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { ITimeOffProps } from "../types";

export const QUERY_KEY_FOR_SINGLE_TIME_OFF = "singleTimeOff";

const getData = async (props: {
  auth: ICurrentCompany;
  id: number;
}): Promise<ITimeOffProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-off-requests/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: ITimeOffProps = res.data.data;
  const data: ITimeOffProps = {
    ...item,
  };

  return data;
};
export const useGetSingleTimeOff = (id: number) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_TIME_OFF, id],
    () => getData({ id, auth: { token, companyId } }),
    {
      enabled: !!id,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
