import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TCompanySubscriptionBillingDetail } from "features/billing/types/company/billingDetails/companySubscriptionBillingDetail";

export const QUERY_KEY_FOR_SUBSCRIPTION_BILLING_DETAILS =
  "company-subscription-billing-details";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TCompanySubscriptionBillingDetail> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/billing/info`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data as TCompanySubscriptionBillingDetail;

  const data: TCompanySubscriptionBillingDetail = result;

  return data;
};

export const useGetSubsciptionBillingDetails = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SUBSCRIPTION_BILLING_DETAILS],
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
