import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TPayrollData = {
  csvFile: any;
};
const createData = async (props: {
  data: TPayrollData;
  auth: ICurrentCompany;
  payrollId: number;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.payrollId}/overtime-sheet`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TPayrollData = {
    ...props.data,
  };

  const response = await axios.postForm(url, data, config);
  return response;
};
export const useAddOvertimeSheet = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TPayrollData; payrollId: number }) =>
    createData({
      data: props.data,
      payrollId: props.payrollId,
      auth: { token, companyId },
    })
  );
};
