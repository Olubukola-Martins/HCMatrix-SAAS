import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TWorkflowApprovalType } from "../types";

type TCreateProps = {
  type: TWorkflowApprovalType;
  workflowId: number;
};

const createOrUpdateWorkflowApprovalSetting = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/workflow/approval/setting`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateOrUpdateWorkflowApprovalSetting = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createOrUpdateWorkflowApprovalSetting({
      data: props,
      auth: { token, companyId },
    })
  );
};
