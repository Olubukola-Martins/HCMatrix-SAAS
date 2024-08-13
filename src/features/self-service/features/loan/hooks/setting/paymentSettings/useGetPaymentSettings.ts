import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { ILoanPaymentSettings } from "../../../types/setting";

export const QUERY_KEY_FOR_GET_LOAN_PAYMENT_SETTINGS = "GET_LOAN_PAYMENT_SETTINGS";

const getData = async (
  props: ICurrentCompany
): Promise<ILoanPaymentSettings> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/setting/eligibility-criteria`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);
  const item: ILoanPaymentSettings = res.data.data;
  const data: ILoanPaymentSettings = {
    ...item,
  };

  return data;
};
export const useGetPaymentSettings = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_GET_LOAN_PAYMENT_SETTINGS],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
