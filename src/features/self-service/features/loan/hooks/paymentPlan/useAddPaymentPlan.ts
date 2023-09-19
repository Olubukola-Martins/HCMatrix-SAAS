import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TSaveCostCentreResponse } from "features/payroll/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TPaymentPlan } from "../../types";

type TData = Pick<TPaymentPlan, "name" | "duration">;
const createData = async (props: {
  data: TData;
  auth: ICurrentCompany;
}): Promise<TSaveCostCentreResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/payment-plan`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  const item: TSaveCostCentreResponse = response.data;
  return item;
};
export const useAddLoanPaymentPlan = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
