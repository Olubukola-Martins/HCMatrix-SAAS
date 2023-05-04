import axios from "axios";
import { useQuery } from "react-query";
import { TVehicleBooking } from "./useFetchVehicleBookings";
import { ICurrentCompany } from "types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  id: number;
}
const QUERY_KEY_FOR_SINGLE_VEHICLE_BOOKING = "single-vehicle-booking";
const getVehicleBooking = async (
  props: IGetDataProps
): Promise<TVehicleBooking> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/vehicle/booking/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TVehicleBooking = res.data.data;

  const data: TVehicleBooking = {
    ...item,
  };

  return data;
};

export const useFetchSingleVehicleBooking = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_VEHICLE_BOOKING, props.id],
    () =>
      getVehicleBooking({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
