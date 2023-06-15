import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TVehicleBookingAnalytics } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps {}
export const QUERY_KEY_FOR_VEHICLE_BOOKING_ANALYTICS_FOR_EMPLOYEE =
  "vehicle-booking-analytics-for-logged-in-employee";
const getData = async (
  auth: ICurrentCompany,
  props: IGetDataProps
): Promise<TVehicleBookingAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/vehicle/analytic/bookings`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {},
  };

  const res = await axios.get(url, config);
  const item: TVehicleBookingAnalytics = res.data.data;

  const data: TVehicleBookingAnalytics = {
    ...item,
  };

  return data;
};

export const useGetVehicleEmployeeBookingAnalytics = (
  props: IGetDataProps = {}
) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_VEHICLE_BOOKING_ANALYTICS_FOR_EMPLOYEE],
    () =>
      getData(
        { token, companyId },
        {
          ...props,
        }
      ),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
