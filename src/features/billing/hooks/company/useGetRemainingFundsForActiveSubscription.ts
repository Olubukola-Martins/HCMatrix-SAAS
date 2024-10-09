import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_REMAINING_FUNDS_FOR_ACTIVE_SUBSCRIPTION =
  "remaining-funds-for-active-subscription";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TRemainingFundsForActiveSubscription | undefined> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/pricing`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TRemainingFundsForActiveSubscription | null = res.data.data;
  const data = item === null ? undefined : item;

  return data;
};

export const useGetRemainingFundsForActiveSubscription = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_REMAINING_FUNDS_FOR_ACTIVE_SUBSCRIPTION],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
      }),
    {
      enabled: !!token && !!companyId, //Dont make api calls if token & companyId are not present
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};

export type TRemainingFundsForActiveSubscription = {
  data: number;
};
