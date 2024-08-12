import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TDirectorsCompliance } from "features/payroll/types/compliance";

export const QUERY_KEY_FOR_WALLET_DIRECTORS_COMPLIANCE =
  "payroll-wallet-compliance-directors";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TDirectorsCompliance> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/compliance/director`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const data: TDirectorsCompliance = res.data.data;

  return data;
};

export const useGetDirectorsCompliance = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_WALLET_DIRECTORS_COMPLIANCE],
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
