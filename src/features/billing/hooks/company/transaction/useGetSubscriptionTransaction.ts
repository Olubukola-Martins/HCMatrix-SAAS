import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TCompanySubscriptionTransaction } from "features/billing/types/company/transaction/companySubscriptionTransaction";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_COMPANY_SUBSCRIPTION_TRANSACTION =
  "company-subscription-transaction";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TCompanySubscriptionTransaction> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/transaction/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TCompanySubscriptionTransaction = res.data.data;

  const data: TCompanySubscriptionTransaction = {
    ...item,
  };

  return data;
};

export const useGetSubscriptionTransaction = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_SUBSCRIPTION_TRANSACTION, props.id],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
