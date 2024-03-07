import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TWorkflowApprovalType } from "features/core/workflows/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TSendApprovalStageReminderProps = {
  entityType: TWorkflowApprovalType;
  entityId: number;
  approvalStageId: number;
};
const sendReminder = async (
  props: TSendApprovalStageReminderProps,
  auth: ICurrentCompany
) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/workflow/approval/stage/${props.approvalStageId}/reminder/${props.entityType}/${props.entityId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const data = {};

  const response = await axios.post(url, data, config);
  return response;
};
export const useSendStageReminder = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    ({
      approvalStageId,
      entityId,
      entityType,
    }: TSendApprovalStageReminderProps) =>
      sendReminder(
        {
          approvalStageId,
          entityId,
          entityType,
        },
        { token, companyId }
      )
  );
};
