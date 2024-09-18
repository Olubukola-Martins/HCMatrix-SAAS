import { Drawer, Skeleton, Table } from "antd";
import React from "react";
import { IModalProps } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions4AuthEmployee";
import { QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS } from "features/self-service/hooks/useGetSelfServiceDashboardAnalytics";
import { PageIntro } from "components/layout/PageIntro";
import {
  QUERY_KEY_FOR_SINGLE_PROFILE_EDIT_REQUEST,
  useGetProfileEditRequestById,
} from "../hooks/useGetProfileEditRequestById";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}

export const ProfileEditRequestDetails: React.FC<IProps> = ({
  open,
  handleClose,
  id,
  approvalRequest,
}) => {
  const { companyId, token } = useApiAuth();
  const { data, isFetching } = useGetProfileEditRequestById({
    id,
    companyId,
    token,
  });

  const queryClient = useQueryClient();
  return (
    <Drawer
      open={open}
      onClose={() => handleClose()}
      footer={null}
      title={"Profile Edit Request Details"}
      style={{ top: 20 }}
      width={`75%`}
    >
      <Skeleton active loading={isFetching} paragraph={{ rows: 8 }}>
        <ApproveOrRejectButton
          className="flex justify-end"
          request={approvalRequest}
          handleSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_PROMOTION_REQUISITIONS],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [
                QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE,
              ],
              // exact: true,
            });
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_PROFILE_EDIT_REQUEST, id],
              // exact: true,
            });

            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SELF_SERVICE_DB_ANALYTICS],
              // exact: true,
            });
            handleClose();
          }}
        />
        <PageIntro title={`Category: ${data?.category.split("-").join(" ")}`} />

        <Table
          className="mt-6"
          columns={[
            {
              title: "",
              render: () => <span>Account Number</span>,
            },
            {
              title: "Current Value",
              render: () => <span>3120704672</span>,
            },
            {
              title: "Proposed Value",
              render: () => <span>3120704772</span>,
            },
            {
              title: "Modified",
              render: () => <span>Yes</span>,
            },
          ]}
          dataSource={Array(4).fill(0)}
        />
      </Skeleton>
    </Drawer>
  );
};
