import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TPayrollTemplateType } from "features/payroll/types/template";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { removeUndefinedProperties } from "utils/dataHelpers/removeUndefinedProperties";

type TPassData = Partial<{
  name: string;
  description: string;
  ytdNet: boolean;
  ytdGross: boolean;
  ytdTax: boolean;
}>;

type TData = {
  type: TPayrollTemplateType;
  id: number;
  data: TPassData;
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/template/${props.data.type}/${props.data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TPassData = {
    ...removeUndefinedProperties(props.data.data),
  };

  const response = await axios.patch(url, data, config);
  return response;
};
export const useUpdatePayrollTemplate = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
