import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPayrollWallet } from "features/payroll/types/wallet";

export const QUERY_KEY_FOR_PAYROLL_WALLET_RETRIEVAL =
  "payroll-wallet-retrieval";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TPayrollWallet[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/wallet`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const data: TPayrollWallet[] = res.data.data;

  return data;
};

export const useRetrievePayrollWallets = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_WALLET_RETRIEVAL],
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
