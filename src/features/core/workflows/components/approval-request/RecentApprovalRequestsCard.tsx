import { useState } from "react";
import { TApprovalRequest } from "../../types/approval-requests";
import ViewApprovalRequest from "./ViewApprovalRequest";
import { RecentCard } from "components/cards/RecentCard";
import { truncateString } from "utils/dataHelpers/truncateString";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useApproveORReject } from "hooks/useApproveORReject";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS } from "features/self-service/hooks/useGetSelfServiceDashboardAnalytics";
import { QUERY_KEY_FOR_COMPANY_EMPLOYEE_DASHBOARD } from "features/core/company/hooks/dashboard/useGetCompanyEmployeeDashboard";
import { QUERY_KEY_FOR_COMPANY_OWNER_DASHBOARD } from "features/core/company/hooks/dashboard/useGetCompanyOwnerDashboard";

const RecentApprovalRequestsCard: React.FC<{
  requests?: TApprovalRequest[];
  title?: string;
  emptyMessage?: string;
}> = ({
  requests,
  title = "Recent Approval Requests",
  emptyMessage = "You have No Approvals",
}) => {
  const queryClient = useQueryClient();

  const [action, setAction] = useState<"view">();
  const [approvalRequest, setApprovalRequest] = useState<TApprovalRequest>();
  const onClose = () => {
    setAction(undefined);
    setApprovalRequest(undefined);
  };
  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_COMPANY_EMPLOYEE_DASHBOARD],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_COMPANY_OWNER_DASHBOARD],
        // exact: true,
      });
    },
  });
  return (
    <>
      <ViewApprovalRequest
        handleClose={onClose}
        open={action === "view"}
        request={approvalRequest}
      />
      {requests && requests.length === 0 && (
        <div className="bg-mainBg shadow border rounded-lg p-3 flex-1">
          <h3 className="text-base font-medium pb-2">{title}</h3>
          <hr />
          <p className="text-center py-5 text-gray-500">{emptyMessage}</p>
        </div>
      )}
      {requests && requests.length > 0 && (
        <RecentCard
          title={title}
          data={requests?.map((item) => ({
            title: truncateString(
              `${item.entityType.split("-").join(" ")} Request`,
              14
            ),
            features: [
              {
                value: item.status,
                color: getAppropriateColorForStatus(item.status),
              },
            ],

            secondaryCol: {
              type: "options",
              options: [
                {
                  name: "View",
                  onClick: () => {
                    setAction("view");
                    setApprovalRequest(item);
                  },
                },
                {
                  name: "Reject",

                  onClick: () =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "rejected",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                      requires2FA: item?.advancedStage?.enableTwoFactorAuth,
                    }),
                },
                {
                  name: "Approve",

                  onClick: () =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "approved",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                      requires2FA: item?.advancedStage?.enableTwoFactorAuth,
                    }),
                },
              ],
            },
          }))}
        />
      )}
    </>
  );
};

export default RecentApprovalRequestsCard;
