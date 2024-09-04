import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { IPaymentPlanDetails } from "../../types/repayment";

export const QUERY_KEY_FOR_GET_REPAYMENT_PLAN_DETAILS =
  "GET_APPROVAL_GET_REPAYMENT_PLAN_DETAILS";

type TData = {
  id: number;
};

const getData = async (props: {
  auth: ICurrentCompany;
  data: TData;
}): Promise<IPaymentPlanDetails> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/payment/${props.data.id}/schedule`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };
  const res = await axios.get(url, config);
  const item: IPaymentPlanDetails = res.data.data;
  const data: IPaymentPlanDetails = {
    ...item,
  };

  return data;
};
export const useGetRepaymentPlanDetails = (props: TData) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_GET_REPAYMENT_PLAN_DETAILS],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          id: props.id,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
