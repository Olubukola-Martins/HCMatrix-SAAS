import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSubscriptionLabel } from "features/billing/types/subscription";
import { GeneralPrice } from "features/billing/types";

export const QUERY_KEY_FOR_SUBSCRIPTION_PLANS = "subscription-plans";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<{ data: TSubscriptionPlanListData[]; total: number }> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/plan`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TSubscriptionPlanListData[] = result.map(
    (item: TSubscriptionPlanListData): TSubscriptionPlanListData => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetSubscriptionPlans = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SUBSCRIPTION_PLANS],
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
export type TSubscriptionPlanListData = {
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
