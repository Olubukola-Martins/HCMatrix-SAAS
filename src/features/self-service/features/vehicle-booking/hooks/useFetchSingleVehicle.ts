import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TVehicle } from "./useFetchVehicles";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_VEHICLE = "single-vehicle";
const getVehicle = async (props: IGetDataProps): Promise<TVehicle> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/vehicle/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TVehicle = res.data.data;

  const data: TVehicle = {
    ...item,
  };

  return data;
};

export const useFetchSingleVehicle = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_VEHICLE, props.id],
    () =>
      getVehicle({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
