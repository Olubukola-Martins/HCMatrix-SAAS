import { QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT } from "features/notifications/hooks/unRead/useGetUnReadNotificationCount";
import { QUERY_KEY_FOR_NOTIFICATIONS } from "features/notifications/hooks/useGetAlerts";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { TApprovalStatus } from "types/statuses";

interface IProps {
  handleSuccess?: () => void;
}

export const useApproveORReject = ({ handleSuccess }: IProps = {}) => {
  // TODO: handle the `handleSuccess` prop by passing dispatching to global state and having it called onSuccess
  const globalCtx = useContext(GlobalContext);
  const { dispatch: globalDispatch } = globalCtx;
  const queryClient = useQueryClient();

  const confirmApprovalAction = ({
    approvalStageId,
    workflowType,
    status,
    requires2FA,
  }: {
    approvalStageId: number;
    requires2FA?: boolean;
    workflowType: "basic" | "advanced";
    status: TApprovalStatus;
  }) => {
    globalDispatch({
      type: EGlobalOps.setCurrentApproval,
      payload: {
        approvalStageId,
        workflowType,
        status,
        requires2FA,
        handleSuccess: () => {
          // This ensures that notifications is updated once an item is approved/rejected
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_NOTIFICATIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT],
            // exact: true,
          });
          handleSuccess?.();
        },
      },
    });
  };

  return { confirmApprovalAction };
};
