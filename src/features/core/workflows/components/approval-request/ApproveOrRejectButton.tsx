import { AppButtonList } from "components/button/AppButtonList";
import React, { useState } from "react";
import { TApprovalRequest } from "../../types/approval-requests";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalStatus } from "types/statuses";
import { IDivProps } from "types/html";

const ApproveOrRejectButton: React.FC<
  {
    request?: TApprovalRequest;
    handleSuccess?: (status?: TApprovalStatus) => void;
  } & IDivProps
> = ({ request, handleSuccess, ...props }) => {
  const [updatedStatus, setUpdatedStatus] = useState<TApprovalStatus>();
  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: (status) => {
      setUpdatedStatus(status);
      handleSuccess?.();
    },
  });
  return (
    <div {...props}>
      {updatedStatus === undefined &&
        request &&
        request.status === "pending" && (
          <AppButtonList
            data={[
              {
                label: "Approve",
                handleClick: () =>
                  confirmApprovalAction({
                    approvalStageId: request?.id,
                    status: "approved",
                    workflowType: !!request?.basicStageId
                      ? "basic"
                      : "advanced",
                    requires2FA: request?.advancedStage?.enableTwoFactorAuth,
                  }),
              },
              {
                label: "Reject",
                handleClick: () =>
                  confirmApprovalAction({
                    approvalStageId: request?.id,
                    status: "rejected",
                    workflowType: !!request?.basicStageId
                      ? "basic"
                      : "advanced",
                    requires2FA: request?.advancedStage?.enableTwoFactorAuth,
                  }),
                variant: "style-with-class",
                additionalClassNames: ["neutralButton"],
              },
            ]}
          />
        )}
    </div>
  );
};

export default ApproveOrRejectButton;
