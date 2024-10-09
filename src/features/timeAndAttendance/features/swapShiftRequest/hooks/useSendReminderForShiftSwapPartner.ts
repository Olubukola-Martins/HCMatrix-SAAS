import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TSendShiftSwapPartnerApprovalStageReminderProps = {
  swapRequestId: number;
};
export const sendReminderForShiftSwapPartner = async (
  props: TSendShiftSwapPartnerApprovalStageReminderProps,
  auth: ICurrentCompany
) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/shift-swap/${props.swapRequestId}/partner-approval/stage`;
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
export const useSendReminderForShiftSwapPartner = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    ({ swapRequestId }: TSendShiftSwapPartnerApprovalStageReminderProps) =>
    sendReminderForShiftSwapPartner(
        {
          swapRequestId,
        },
        { token, companyId }
      )
  );
};
