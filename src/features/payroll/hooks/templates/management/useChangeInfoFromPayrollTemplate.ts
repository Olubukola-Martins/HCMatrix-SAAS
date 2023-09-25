import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import {
  TChangeInfoFromPayrollTemplateAction,
  TPayrollTemplateInfoType,
  TPayrollTemplateType,
} from "features/payroll/types/template";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  type: TPayrollTemplateType;
  templateId: number;
  infoType: TPayrollTemplateInfoType;
  templateInfoId: number;
  action: TChangeInfoFromPayrollTemplateAction;
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/template/${props.data.type}/${props.data.templateId}/management/${props.data.infoType}/${props.data.templateInfoId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  let response;
  if (props.data.action === "add") {
    response = await axios.post(url, {}, config);
  }
  if (props.data.action === "delete") {
    response = await axios.delete(url, config);
  }

  return response;
};
export const useChangeInfoFromPayrollTemplate = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
