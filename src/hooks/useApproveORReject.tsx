import { useContext } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { TApprovalStatus } from "types/statuses";

interface IProps {
  handleSuccess?: () => void;
}

export const useApproveORReject = ({ handleSuccess }: IProps = {}) => {
  // TODO: handle the `handleSuccess` prop by passing dispatching to global state and having it called onSuccess
  const globalCtx = useContext(GlobalContext);
  const { dispatch: globalDispatch } = globalCtx;

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
      payload: { approvalStageId, workflowType, status, requires2FA },
    });
  };

  return { confirmApprovalAction };
};
