import { ICurrentCompany } from "AppTypes/DataEntitities";

import axios from "axios";
import { useQuery } from "react-query";
import { TVehicle } from "Self_Service/Components/VehicleBooking/hooks/useFetchVehicles";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  id: number;
}
const QUERY_KEY_FOR_SINGLE_VEHICLE = "single-vehicle";
const getVehicle = async (props: IGetDataProps): Promise<TVehicle> => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/self-service/vehicle/${props.id}`;

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

export const useFetchSingleDelegation = (props: IGetDataProps) => {
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
