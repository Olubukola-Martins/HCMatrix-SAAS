import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLoanWorthiness } from "../../types";

export const QUERY_KEY_FOR_LOAN_WORTHINESS = "loan-worthiness";

export type TLoanWorthinessInputData = Partial<{
  paymentPlanId: number;
  amount: number;
}>;
const getData = async (props: {
  data: TLoanWorthinessInputData;
  auth: ICurrentCompany;
}): Promise<TLoanWorthiness> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/worthiness`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      ...props.data,
    },
  };

  const res = await axios.get(url, config);
  const item: TLoanWorthiness = res.data.data;

  const data: TLoanWorthiness = {
    ...item,
  };

  return data;
};

export const useGetLoanWorthiness = (props: TLoanWorthinessInputData = {}) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_LOAN_WORTHINESS, props.paymentPlanId, props.amount],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      enabled:
        typeof props.paymentPlanId === "number" &&
        typeof props.amount === "number",
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
