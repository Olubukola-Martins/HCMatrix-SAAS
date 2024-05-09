import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLeave } from "../types";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_LEAVE = "single-leave";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TLeave> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TLeave = res.data.data;

  const data: TLeave = {
    ...item,
  };

  return data;
};

export const useGetSingleLeave = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_LEAVE, props.id],
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
