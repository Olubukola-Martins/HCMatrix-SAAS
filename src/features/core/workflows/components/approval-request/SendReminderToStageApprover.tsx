import { AppButton } from "components/button/AppButton";
import React from "react";
import {
  TSendApprovalStageReminderProps,
  useSendStageReminder,
} from "../../hooks/stage/reminder/useSendStageReminder";
import { openNotification } from "utils/notifications";

const SendReminderToStageApprover: React.FC<
  TSendApprovalStageReminderProps
> = ({ approvalStageId, entityType, entityId }) => {
  const { mutate, isLoading } = useSendStageReminder();
  const handleAction = () => {
    mutate(
      { approvalStageId, entityType, entityId },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
        },
      }
    );
  };
  return (
    <AppButton
      variant="transparent"
      label="Send Reminder"
      isLoading={isLoading}
      handleClick={() => handleAction()}
    />
  );
};

export default SendReminderToStageApprover;
