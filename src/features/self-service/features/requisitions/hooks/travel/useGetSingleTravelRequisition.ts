import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TTravelRequest } from "../../types/travel";

interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_TRAVEL_REQUEST = "single-travel-request";
const getData = async (props: IGetDataProps): Promise<TTravelRequest> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/travel-request/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TTravelRequest = res.data.data;

  const data: TTravelRequest = {
    ...item,
  };

  return data;
};

export const useGetSingleTravelRequisition = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_TRAVEL_REQUEST, props.id],
    () =>
      getData({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
