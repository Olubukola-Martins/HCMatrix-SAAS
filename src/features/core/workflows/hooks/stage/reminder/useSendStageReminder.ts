import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TApprovalStage } from "features/core/workflows/types/approval-stage";
import { sendReminderForLeaveRelieverStage } from "features/self-service/features/leave/hooks/leaveRelieverApproval/stage/useSendReminderForLeaveRelieverStage";
import { sendReminderForShiftSwapPartner } from "features/timeAndAttendance/features/swapShiftRequest/hooks/useSendReminderForShiftSwapPartner";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TSendApprovalStageReminderProps = {
  entityType: TApprovalStage["type"];
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

  const data = undefined;

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
    }: TSendApprovalStageReminderProps) => {
      if (entityType === "leave-relieve") {
        return sendReminderForLeaveRelieverStage(
          {
            leaveId: entityId,
          },
          {
            token,
            companyId,
          }
        );
      }
      if (entityType === "shift-swap") {
        return sendReminderForShiftSwapPartner(
          {
            swapRequestId: entityId,
          },
          {
            token,
            companyId,
          }
        );
      }
      return sendReminder(
        {
          approvalStageId,
          entityId,
          entityType,
        },
        { token, companyId }
      );
    }
  );
};
