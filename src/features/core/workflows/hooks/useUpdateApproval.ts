import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  status: "approved" | "rejected";
};

const updateApproval = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
  workflowType: "basic" | "advanced";
  approvalStageId: number;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/workflow/approval/${props.workflowType}/${props.approvalStageId}`;
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

  const response = await axios.patch(url, data, config);
  return response;
};
export const useUpdateApproval = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: {
      data: TCreateProps;
      workflowType: "basic" | "advanced";
      approvalStageId: number;
    }) =>
      updateApproval({
        data: props.data,
        workflowType: props.workflowType,
        approvalStageId: props.approvalStageId,
        auth: { token, companyId },
      })
  );
};
