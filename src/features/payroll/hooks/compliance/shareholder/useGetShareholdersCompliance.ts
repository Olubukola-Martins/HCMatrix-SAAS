import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TShareholdersCompliance } from "features/payroll/types/compliance";

export const QUERY_KEY_FOR_WALLET_SHAREHOLDERS_COMPLIANCE =
  "payroll-wallet-compliance-shareholders";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TShareholdersCompliance> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/compliance/shareholder`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const data: TShareholdersCompliance = res.data.data;

  return data;
};

export const useGetShareholdersCompliance = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_WALLET_SHAREHOLDERS_COMPLIANCE],
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
