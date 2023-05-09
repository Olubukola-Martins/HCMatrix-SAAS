import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TLeave } from "../types";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_LEAVE = "single-leave";
const getLeave = async (props: IGetDataProps): Promise<TLeave> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TLeave = res.data.data;

  const data: TLeave = {
    ...item,
  };

  return data;
};

export const useFetchSingleLeave = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_LEAVE, props.id],
    () =>
      getLeave({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
