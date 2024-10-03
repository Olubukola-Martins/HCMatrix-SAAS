import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSubscriptionLabel } from "features/billing/types/subscription";

export const QUERY_KEY_FOR_SUBSCRIPTION_MODULE_BY_ID =
  "subscription-module-by-id";

const getData = async (props: {
  data: { id: number };
  auth: ICurrentCompany;
}): Promise<TSubscriptionModule | null> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/module/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TSubscriptionModule = result as TSubscriptionModule;
  return data;
};

export const useGetGetSubscriptionModuleById = ({ id }: { id: number }) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SUBSCRIPTION_MODULE_BY_ID, id],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          id,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
export type TSubscriptionModule = {
  id: number;
  name: string;
  label: TSubscriptionLabel;
  iconUrl: null;
  description: string;
  createdAt: string;
  updatedAt: string;
  prices: Price[];
  features: Feature[];
};

interface Feature {
  id: number;
  name: string;
  label: string;
  moduleId: number;
  createdAt: string;
  updatedAt: string;
}

interface Price {
  id: number;
  planId: null;
  addonId: null;
  moduleId: number;
  amount: string;
  billingCycle: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
