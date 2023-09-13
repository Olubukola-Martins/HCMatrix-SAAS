import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TPayrollTemplateType } from "features/payroll/types/template";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TAddPayrollTemplateData = {
  name: string;
  description: string;
  ytdNet?: boolean;
  ytdGross?: boolean;
  ytdTax?: boolean;
  employeeInformation: EmployeeInformation[];
  payrollInformation: EmployeeInformation[];
};

interface EmployeeInformation {
  templateInformationId: number;
}

type TData = {
  type: TPayrollTemplateType;
  data: TAddPayrollTemplateData;
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/template/${props.data.type}/`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TAddPayrollTemplateData = {
    ...props.data.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useAddPayrollTemplate = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
