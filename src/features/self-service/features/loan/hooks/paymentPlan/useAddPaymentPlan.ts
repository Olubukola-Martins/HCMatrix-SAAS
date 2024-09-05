import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TPaymentPlan } from "../../types";

type TData = Pick<TPaymentPlan, "name" | "duration" | "id">;
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const updateUrl = `/loan/payment/plan/${props.data.id}`;
  const addUrl = "/loan/payment/plan";
  const acceptedUrl = props.data.id ? updateUrl : addUrl;

  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}${acceptedUrl}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    name: props.data.name,
    duration: props.data.duration,
  };

  const requestType = props.data.id ? axios.put : axios.post;
  const response = await requestType(url, data, config);
  return response;
};
export const useAddLoanPaymentPlan = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
