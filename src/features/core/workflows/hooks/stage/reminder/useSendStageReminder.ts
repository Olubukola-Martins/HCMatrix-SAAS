import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TWorkflowApprovalType } from "features/core/workflows/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TSendReminderProps = {
  entityType: TWorkflowApprovalType;
  entityId: number;
  approvalStageId: number;
};
const sendReminder = async (
  props: TSendReminderProps,
  auth: ICurrentCompany
) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/workflow/approval/stage/${props.approvalStageId}/${props.entityType}/${props.entityId}`;
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
    ({ approvalStageId, entityId, entityType }: TSendReminderProps) =>
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
