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
  salaryComponentType: "allowance" | "deduction";
  employeeIds: number[];
  payrollId: number;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${
    props.payrollId
  }/employee/${props.employeeIds.join(",")}/salary-component/${
    props.salaryComponentType
  }`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...props.data,
    amount: `${props.data.amount}`,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useAddAllowanceOrDeductionToEmployees = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: {
      data: TData;
      salaryComponentType: "allowance" | "deduction";
      employeeIds: number[];
      payrollId: number;
    }) =>
      createData({
        data: props.data,
        payrollId: props.payrollId,
        salaryComponentType: props.salaryComponentType,
        employeeIds: props.employeeIds,
        auth: { token, companyId },
      })
  );
};
