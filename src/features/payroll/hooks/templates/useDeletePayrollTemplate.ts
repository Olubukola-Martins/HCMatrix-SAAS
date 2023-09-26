import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TPayrollTemplateType } from "features/payroll/types/template";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  type: TPayrollTemplateType;
  templateId: number;
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/template/${props.data.type}/${props.data.templateId}/`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export const useDeletePayrollTemplate = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
