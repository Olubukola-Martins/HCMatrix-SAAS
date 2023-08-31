import { useContext } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";

interface IProps {
  handleSuccess?: () => void;
}

export const useApproveORReject = ({ handleSuccess }: IProps = {}) => {
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
    status: "approved" | "rejected";
  }) => {
    globalDispatch({
      type: EGlobalOps.setCurrentApproval,
      payload: { approvalStageId, workflowType, status, requires2FA },
    });
  };

  return { confirmApprovalAction };
};
