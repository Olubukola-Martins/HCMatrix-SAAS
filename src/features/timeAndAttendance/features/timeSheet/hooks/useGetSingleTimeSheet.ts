import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { singleTimeSheetProps } from "../types";

export const QUERY_KEY_FOR_SINGLE_TIME_SHEET = "singleTimeSheet";

const getData = async (props: {
  auth: ICurrentCompany;
  id: number;
  date: string;
}): Promise<singleTimeSheetProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/attendance/time-sheet/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      date: props.date,
    },
  };
  const res = await axios.get(url, config);
  const item: singleTimeSheetProps = res.data.data;
  const data: singleTimeSheetProps = {
    ...item,
  };

  return data;
};
export const useGetSingleTimeSheet = (id: number, date: string) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_TIME_SHEET, id, date],
    () => getData({ id, date, auth: { token, companyId } }),
    {
      enabled: !!id,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
