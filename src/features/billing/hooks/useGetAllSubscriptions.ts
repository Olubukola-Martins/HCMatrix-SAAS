import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSubscription, TSubscriptionType } from "../types/subscription";
import { TSubscriptionPriceType } from "../types/priceType";

export const QUERY_KEY_FOR_SUBSCRIPTIONS = "subscriptions";
interface IGetDataProps {
  type: TSubscriptionType;
  priceType?: TSubscriptionPriceType;
}
const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TSubscription[]; total: number }> => {
  const { type, priceType } = props.data;
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      priceType,
      type,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TSubscription[] = result.map(
    (item: TSubscription): TSubscription => ({ ...item })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetAllSubscriptions = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SUBSCRIPTIONS, props.type, props.priceType],
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
