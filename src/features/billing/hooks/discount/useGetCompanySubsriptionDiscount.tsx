import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TCompanySubscriptionDiscount } from "features/billing/types/discount";

export const QUERY_KEY_FOR_COMPANY_SUBSCRITION_DISCOUNT =
  "company-subscription-discount";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TCompanySubscriptionDiscount | undefined> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/discount`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TCompanySubscriptionDiscount | null = res.data.data;
  const data = item === null ? undefined : item;

  return data;
};

export const useGetCompanySubsriptionDiscount = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_SUBSCRITION_DISCOUNT],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
