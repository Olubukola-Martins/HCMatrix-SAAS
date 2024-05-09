import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TTrainingSession } from "features/billing/types/addOns/trainingSession";

export const QUERY_KEY_FOR_TRAINING_SESSIONS = "training-sessions";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<{ data: TTrainingSession[]; total: number }> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/add-ons/training-session`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TTrainingSession[] = result.map(
    (item: TTrainingSession): TTrainingSession => ({ ...item })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetAllTrainingSessions = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_TRAINING_SESSIONS],
    () =>
      getData({
        auth: { token, companyId },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
