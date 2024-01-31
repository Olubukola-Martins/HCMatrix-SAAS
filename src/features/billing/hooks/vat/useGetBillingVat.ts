import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TBillingVat } from "features/billing/types/vat";

export const QUERY_KEY_FOR_BILLING_VAT = "billing-vat";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TBillingVat | undefined> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/vat`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TBillingVat | null = res.data.data;
  const data = item === null ? undefined : item;

  return data;
};

export const useGetBillingVat = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_BILLING_VAT],
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
