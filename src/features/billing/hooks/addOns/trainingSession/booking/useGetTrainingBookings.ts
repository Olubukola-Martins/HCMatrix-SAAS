import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import {
  TTrainingSessionBooking,
  TTrainingSessionBookingStatus,
} from "features/billing/types/addOns/trainingSession";

interface IGetDataProps {
  startDate?: string;
  endDate?: string;
  status?: TTrainingSessionBookingStatus;
}

export const QUERY_KEY_FOR_TRAINING_SESSION_BOOKINGS =
  "training-session-bookings";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TTrainingSessionBooking[]; total: number }> => {
  const status = props.data.status;
  const endDate = props.data.endDate;
  const startDate = props.data.startDate;

  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/add-ons/training-session/booking`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      startDate,
      endDate,
      status,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TTrainingSessionBooking[] = result.map(
    (item: TTrainingSessionBooking): TTrainingSessionBooking => ({ ...item })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetTrainingBookings = ({
  props = {},
}: {
  props?: IGetDataProps;
}) => {
  const { token, companyId } = useApiAuth();

  const { startDate, endDate, status } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_TRAINING_SESSION_BOOKINGS, startDate, endDate, status],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
