import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSubscriptionLabel } from "features/billing/types/subscription";
import { GeneralPrice } from "features/billing/types";

export const QUERY_KEY_FOR_SUBSCRIPTION_PLAN_BY_ID = "subscription-plan-by-id";

const getData = async (props: {
  data: { id?: number };
  auth: ICurrentCompany;
}): Promise<TSubscriptionPlan> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/plan/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TSubscriptionPlan = result as TSubscriptionPlan;
  return data;
};

export const useGetGetSubscriptionPlanById = ({ id }: { id?: number }) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SUBSCRIPTION_PLAN_BY_ID, id],
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
      enabled: !!id,
    }
  );

  return queryData;
};
export type TSubscriptionPlan = {
  id: number;
  name: string;
  label: string;
  isFree: boolean;
  description: null;
  createdAt: string;
  updatedAt: string;
  prices: GeneralPrice[];
  modules: Module[];
};

interface Module {
  id: number;
  name: string;
  label: TSubscriptionLabel;
  iconUrl: null;
  description: null | string;
  createdAt: string;
  updatedAt: string;
  subscription_plan_module: Subscriptionplanmodule;
  features: Feature[];
}

interface Feature {
  id: number;
  name: string;
  label: string;
  moduleId: number;
  createdAt: string;
  updatedAt: string;
}

interface Subscriptionplanmodule {
  createdAt: string;
  updatedAt: string;
  moduleId: number;
  planId: number;
}

interface Price {
  id: number;
  planId: number;
  addonId: null;
  moduleId: null;
  amount: string;
  billingCycle: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
