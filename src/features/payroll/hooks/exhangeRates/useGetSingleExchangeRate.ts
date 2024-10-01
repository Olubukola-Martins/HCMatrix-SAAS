import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TExchangeRateListItem } from "features/payroll/types";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_EXCHANGE_RATE = "single-exchange-rate";
export const getSingleExchangeRate = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TExchangeRateListItem> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/exchange-rate/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TExchangeRateListItem = res.data.data;

  const data: TExchangeRateListItem = {
    ...item,
  };

  return data;
};

export const useGetSingleExchangeRate = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_EXCHANGE_RATE],
    () =>
      getSingleExchangeRate({
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
