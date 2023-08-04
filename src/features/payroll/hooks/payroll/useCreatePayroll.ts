import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TPayrollData = {
  name: string;
  date: string;
  description: string;
  frequency: string;
  costCentreId: number;
};
const createData = async (props: {
  data: TPayrollData;
  auth: ICurrentCompany;
  schemeType: TPayrollSchemeType;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.schemeType}`;
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

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreatePayroll = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: { data: TPayrollData; schemeType: TPayrollSchemeType }) =>
      createData({
        data: props.data,
        schemeType: props.schemeType,
        auth: { token, companyId },
      })
  );
};
