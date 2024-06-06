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
  frequency: "monthly" | "daily" | number;
  costCentreId: number;
  csvFile?: any;
};
type CreatePayrollResponse = {
  message: string;
  data: {
    status: string;
    id: number;
    schemeId: number;
    name: string;
    label: string;
    date: string;
    description: string;
    frequency: string;
    costCentreId: number;
    companyId: number;
    updatedAt: string;
    createdAt: string;
  };
  errors?: string[];
};
const createPayroll = async (props: {
  projectId?: number;
  data: TPayrollData;
  auth: ICurrentCompany;
  schemeType: TPayrollSchemeType;
}): Promise<CreatePayrollResponse> => {
  try {
    const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.schemeType}`;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${props.auth.token}`,
        "x-company-id": props.auth.companyId,
      },
      params: { projectId: props.projectId },
    };

    const data: TPayrollData = {
      ...props.data,
    };

    const response = await axios.postForm(url, data, config);
    const result = response?.data as CreatePayrollResponse;
    return result;
  } catch (error) {
    throw error;
  }
};
export const useCreatePayroll = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: {
      data: TPayrollData;
      schemeType: TPayrollSchemeType;
      projectId?: number;
    }) =>
      createPayroll({
        projectId: props.projectId,
        data: props.data,
        schemeType: props.schemeType,
        auth: { token, companyId },
      })
  );
};
