import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TLoanRepayment } from "../../types";

type TMakeLoanRepayResponse = {
  message: string;
  data: Data;
};

interface Data {
  authorization_url: string;
  access_code: string;
  reference: string;
}

type TData = Pick<TLoanRepayment, "loanId" | "amount" | "paymentMethod">;
const createData = async (props: {
  data: TData;
  auth: ICurrentCompany;
}): Promise<TMakeLoanRepayResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/payment`;
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
  const item: TMakeLoanRepayResponse = response.data;
  return item;
};
export const useMakeLoanRepayment = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
