import { AppButtonList } from "components/button/AppButtonList";
import React from "react";
import { TApprovalRequest } from "../../types/approval-requests";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalStatus } from "types/statuses";

const ApproveOrRejectButton: React.FC<{
  request?: TApprovalRequest;
  handleSuccess?: (status?: TApprovalStatus) => void;
}> = ({ request, handleSuccess }) => {
  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess,
  });
  return (
    <>
      {request && request.status === "pending" && (
        <AppButtonList
          data={[
            {
              label: "Approve",
              handleClick: () =>
                confirmApprovalAction({
                  approvalStageId: request?.id,
                  status: "approved",
                  workflowType: !!request?.basicStageId ? "basic" : "advanced",
                  requires2FA: request?.advancedStage?.enableTwoFactorAuth,
                }),
            },
            {
              label: "Reject",
              handleClick: () =>
                confirmApprovalAction({
                  approvalStageId: request?.id,
                  status: "rejected",
                  workflowType: !!request?.basicStageId ? "basic" : "advanced",
                  requires2FA: request?.advancedStage?.enableTwoFactorAuth,
                }),
              variant: "style-with-class",
              additionalClassNames: ["neutralButton"],
            },
          ]}
        />
      )}
    </>
  );
};

export default ApproveOrRejectButton;
