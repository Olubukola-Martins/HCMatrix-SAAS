import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  isActive: boolean;
};
const createData = async (props: {
  data: TData;
  auth: ICurrentCompany;
  payrollId: number;
  employeeId: number;
  salaryComponentId: number;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.payrollId}/employee/${props.employeeId}/salary-component/${props.salaryComponentId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = {
    ...props.data,
  };

  const response = await axios.patch(url, data, config);
  return response;
};
export const useActivateOrDeactivateEmployeeSalaryComponent = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: {
      data: TData;
      payrollId: number;
      employeeId: number;
      salaryComponentId: number;
    }) =>
      createData({
        data: props.data,
        payrollId: props.payrollId,
        employeeId: props.employeeId,
        salaryComponentId: props.salaryComponentId,
        auth: { token, companyId },
      })
  );
};
