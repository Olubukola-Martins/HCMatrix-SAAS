import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TLoanRequest } from "../types";

export type TRequestForLoanData = Pick<
  TLoanRequest,
  | "date"
  | "description"
  | "typeId"
  | "paymentPlanId"
  | "documentUrl"
  | "amount"
  | "loanEligibility"
  | "employeeId"
>;
const createData = async (props: {
  data: TRequestForLoanData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TRequestForLoanData = {
    employeeId: props.data.employeeId,
    typeId: props.data.typeId,
    paymentPlanId: props.data.paymentPlanId,
    date: props.data.date,
    amount: props.data.amount,
    description: props.data.description,
    documentUrl: props.data.documentUrl,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useRequestForLoan = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TRequestForLoanData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
