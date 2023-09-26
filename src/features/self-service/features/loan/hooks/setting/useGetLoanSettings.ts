import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLoanSetting } from "../../types";

export const QUERY_KEY_FOR_LOAN_SETTING = "loan-setting";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TLoanSetting> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/setting`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TLoanSetting = res.data.data;

  const data: TLoanSetting = {
    ...item,
  };

  return data;
};

export const useGetLoanSettings = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_LOAN_SETTING],
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
