import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { THoliday } from "../types";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_HOLIDAY = "single-holiday";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<THoliday> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/holiday/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: THoliday = res.data.data;

  const data: THoliday = {
    ...item,
  };

  return data;
};

export const useGetSingleHoliday = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_HOLIDAY],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
