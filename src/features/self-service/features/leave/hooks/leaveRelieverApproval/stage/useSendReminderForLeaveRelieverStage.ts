import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TSendLeaveRelieverApprovalStageReminderProps = {
  leaveId: number;
};
export const sendReminderForLeaveRelieverStage = async (
  props: TSendLeaveRelieverApprovalStageReminderProps,
  auth: ICurrentCompany
) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/${props.leaveId}/reliever-approval/stage`;
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
export const useSendReminderForLeaveRelieverStage = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    ({ leaveId }: TSendLeaveRelieverApprovalStageReminderProps) =>
      sendReminderForLeaveRelieverStage(
        {
          leaveId,
        },
        { token, companyId }
      )
  );
};
