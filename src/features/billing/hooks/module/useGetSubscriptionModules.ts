import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSubscriptionLabel } from "features/billing/types/subscription";
import { GeneralPrice } from "features/billing/types";

export const QUERY_KEY_FOR_SUBSCRIPTION_MODULES = "subscription-modules";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<{ data: TSubscriptionModuleListData[]; total: number }> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/module`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TSubscriptionModuleListData[] = result.map(
    (item: TSubscriptionModuleListData): TSubscriptionModuleListData => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetSubscriptionModules = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SUBSCRIPTION_MODULES],
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
export type TSubscriptionModuleListData = {
  id: number;
  name: string;
  label: TSubscriptionLabel;
  iconUrl: null;
  description: null | string;
  createdAt: string;
  updatedAt: string;
  prices: GeneralPrice[];
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
