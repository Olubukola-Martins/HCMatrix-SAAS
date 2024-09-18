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
import { ColumnsType } from "antd/es/table";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

interface IProps extends IModalProps {
  id: number;
  approvalRequest?: TApprovalRequest;
}
type TProfileEditRequestComparison = {
  field: string;
  currentValue?: string | number;
  proposedValue?: string | number;
  isModified: boolean;
};

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
  const columns: ColumnsType<TProfileEditRequestComparison> = [
    {
      title: "",
      dataIndex: "field",
      key: "field",
      render: (_, item) => <span className="capitalize">{item.field}</span>,
    },
    {
      title: "Current value",
      dataIndex: "Current value",
      key: "Current value",
      render: (_, item) => (
        <span>
          {typeof item.currentValue === "string"
            ? item.currentValue
            : formatNumberWithCommas(item.currentValue)}{" "}
        </span>
      ),
    },
    {
      title: "Proposed value",
      dataIndex: "Proposed value",
      key: "Proposed value",
      render: (_, item) => (
        <span>
          {typeof item.proposedValue === "string"
            ? item.proposedValue
            : formatNumberWithCommas(item.proposedValue)}{" "}
        </span>
      ),
    },
    {
      title: "Mofified",
      dataIndex: "modified",
      key: "modified",
      render: (_, item) => <span>{item.isModified ? "Yes" : "No"} </span>,
    },
  ];
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
          columns={columns}
          dataSource={Object.entries(data?.content ?? {}).map(
            ([key, value]): TProfileEditRequestComparison => {
              return {
                currentValue: value,
                field: key,
                isModified: false,
                proposedValue: `nil`,
              };
            }
          )}
        />
      </Skeleton>
    </Drawer>
  );
};
