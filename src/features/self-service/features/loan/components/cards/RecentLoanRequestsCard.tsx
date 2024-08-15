import React, { useState } from "react";
import { RecentCard } from "components/cards/RecentCard";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useApproveORReject } from "hooks/useApproveORReject";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_LOAN_REQUESTS } from "../../hooks/requests/useGetLoanRequests";
import { QUERY_KEY_FOR_LOAN_ANALYTICS } from "../../hooks/analytics/useGetLoanAnalytics";
import { LoanDetails } from "../AllLoans/LoanDetails";

// TO DO: Remove this export and if need be move to styles/reused
export const requestStyle =
  "flex items-center justify-between cursor-pointer group border-b pb-2";

export const LIMIT_OF_ITEMS_TO_DISPLAY = 3;

export const RecentLoanRequestsCard: React.FC<{
  handleSeeAll?: () => void;
}> = ({ handleSeeAll }) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useFetchApprovalRequests({
    type: "loan",
    pagination: {
      limit: LIMIT_OF_ITEMS_TO_DISPLAY,
      offset: 0,
    },
  });
  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_LOAN_REQUESTS],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_LOAN_ANALYTICS],
        // exact: true,
      });
    },
  });
  const [action, setAction] = useState<"view">();
  const [loanId, setLoanId] = useState<number>();
  const clearAction = () => {
    setAction(undefined);
    setLoanId(undefined);
  };
  return (
    <>
      {loanId && (
        <LoanDetails
          id={loanId}
          handleClose={clearAction}
          open={action === "view"}
        />
      )}
      <RecentCard
        title="Recent Approval Requests"
        total={data?.total}
        loading={isLoading}
        data={data?.data.map((item) => ({
          title: `${getEmployeeFullName(item.loan?.employee)}`,
          features: [
            {
              name: "ID",
              value: `${item.id}`,
            },
            {
              name: "Loan Type",
              value: `${item.loan?.type.name}`,
            },
            {
              name: "Amount",
              value: `${item.loan?.amount}`,
            },
          ],
          secondaryCol: {
            type: "options",
            options: [
              {
                name: "View",
                onClick: () => {
                  setAction("view");
                  setLoanId(item.loan?.id);
                },
              },
              // Done so that approve/reject options dont show up when request is already approved
              ...(item?.loan?.status === "pending"
                ? [
                    {
                      name: "Approve",
                      onClick: () =>
                        confirmApprovalAction({
                          approvalStageId: item?.id,
                          status: "approved",
                          workflowType: !!item?.basicStageId
                            ? "basic"
                            : "advanced",
                          requires2FA: item?.advancedStage?.enableTwoFactorAuth,
                        }),
                    },
                    {
                      name: "Reject",
                      onClick: () =>
                        confirmApprovalAction({
                          approvalStageId: item?.id,
                          status: "rejected",
                          workflowType: !!item?.basicStageId
                            ? "basic"
                            : "advanced",
                          requires2FA: item?.advancedStage?.enableTwoFactorAuth,
                        }),
                    },
                  ]
                : []),
            ],
          },
        }))}
        handleViewMore={handleSeeAll}
      />
    </>
  );
};
