import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TPassData = {
  name: string;
  description: string;
  fromDate: string;
  toDate: string;
  templateId: number;
  schemes: TPayrollSchemeType[];
};

type TData = {
  data: TPassData;
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/report`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TPassData = {
    ...props.data.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useAddPayrollReport = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
