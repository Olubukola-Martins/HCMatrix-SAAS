import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TPaymentPlan } from "../../types";

export const QUERY_KEY_FOR_SINGLE_LOAN_PAYMENT_PLAN =
  "single-loan-payment-plan";

type TData = {
  id: number;
};
const getData = async (props: {
  data: TData;
  auth: ICurrentCompany;
}): Promise<TPaymentPlan> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/payment-plan/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TPaymentPlan = res.data.data;

  const data: TPaymentPlan = {
    ...item,
  };

  return data;
};

export const useGetSingleLoanPaymentPlan = (props: TData) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_LOAN_PAYMENT_PLAN, props.id],
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
