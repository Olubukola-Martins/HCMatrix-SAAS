import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  name: string;
  label: string;
  mode: "fixed" | "percentage" | "formula";
  amount: string | number;
};
const createData = async (props: {
  data: TData;
  auth: ICurrentCompany;
  employeeId: number;
  payrollId: number;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.payrollId}/employee/${props.employeeId}/salary-component/configure-tax`;
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
  return response;
};
export const useConfigureTaxForAnExapatriate = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: { data: TData; employeeId: number; payrollId: number }) =>
      createData({
        data: props.data,
        payrollId: props.payrollId,
        employeeId: props.employeeId,
        auth: { token, companyId },
      })
  );
};
