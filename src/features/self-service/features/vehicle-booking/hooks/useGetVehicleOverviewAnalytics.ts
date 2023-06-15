import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TVehicleOverviewAnalytics } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps {
  year?: string;
}
export const QUERY_KEY_FOR_VEHICLE_OVERVIEW_ANALYTICS =
  "vehicle-overview-analytics";
const getData = async (
  auth: ICurrentCompany,
  props: IGetDataProps
): Promise<TVehicleOverviewAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/vehicle/analytic/overview`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {
      year: props.year,
    },
  };

  const res = await axios.get(url, config);
  const item: TVehicleOverviewAnalytics = res.data.data;

  const data: TVehicleOverviewAnalytics = {
    ...item,
  };

  return data;
};

export const useGetVehicleOverviewAnalytics = (props: IGetDataProps = {}) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_VEHICLE_OVERVIEW_ANALYTICS, props.year],
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
