import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";

export const QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION =
  "active-company-subscription";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TCompanySubscription | undefined> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TCompanySubscription | null = res.data.data;
  const data = item === null ? undefined : item;

  return data;
};

export const useGetCompanyActiveSubscription = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION],
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
