import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TTrainingSessionBooking } from "features/billing/types/addOns/trainingSession";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_TRAINING_BOOKING = "single-training-booking";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TTrainingSessionBooking> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/add-ons/training-session/booking/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TTrainingSessionBooking = res.data.data;

  const data: TTrainingSessionBooking = {
    ...item,
  };

  return data;
};

export const useGetSingleTrainingBooking = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_TRAINING_BOOKING, props.id],
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
