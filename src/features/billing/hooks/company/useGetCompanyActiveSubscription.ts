import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { AciveCompanySubscription } from "features/billing/types/company/active-company-subscription";

export const QUERY_KEY_FOR_ACTIVE_COMPANY_SUBSCRITION =
  "active-company-subscription";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<AciveCompanySubscription | undefined> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: AciveCompanySubscription | null = res.data.data;
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
      enabled: !!token && !!companyId, //Dont make api calls if token & companyId are not present
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
