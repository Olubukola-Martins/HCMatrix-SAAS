import { Space, Dropdown, Menu } from "antd";

import { TableWithFocusType } from "components/table";
import { AiOutlineMore } from "react-icons/ai";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { TApprovalStatus } from "types/statuses";

import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useQueryClient } from "react-query";
import { TransferDetails } from "./TransferDetails";
import { QUERY_KEY_FOR_TRANSFER_REQUISITIONS } from "../../requisitions/hooks/transfer/useGetTransferRequisitions";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

const TransferApprovalRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const queryClient = useQueryClient();

  const [showD, setShowD] = useState(false);
  const [request, setRequest] = useState<TApprovalRequest>();

  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "transfer",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_TRANSFER_REQUISITIONS],
        // exact: true,
      });
    },
  });

  const originalColumns: ColumnsType<TApprovalRequest> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">
          {item ? getEmployeeFullName(item?.transferRequisition?.employee) : ""}
        </span>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "Employee ID",
      key: "Employee ID",
      render: (_, item) => (
        <span className="capitalize">
          {item?.transferRequisition?.employee.empUid}{" "}
        </span>
      ),
    },
    {
      title: "Current Designation",
      dataIndex: "Current Designation",
      key: "Current Designation",
      ellipsis: true,

      render: (_, item) => (
        <span className="capitalize">
          {item?.transferRequisition?.employee?.designation?.name}
        </span>
      ),
    },

    {
      title: "Current Department",
      dataIndex: "Current Department",
      key: "Current Department",

      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">
          {item?.transferRequisition?.employee?.designation?.department.name}
        </span>
      ),
    },
    {
      title: "Current Branch",
      dataIndex: "Current Branch",
      ellipsis: true,
      key: "Current Branch",

      render: (_, item) => (
        <span className="capitalize">
          {item?.transferRequisition?.employee.jobInformation?.branch?.name}
        </span>
      ),
    },
    {
      title: "Proposed Designation",
      dataIndex: "Proposed Designation",
      key: "Proposed Designation",
      ellipsis: true,

      render: (_, item) => (
        <span className="capitalize">
          {item?.transferRequisition?.proposedDesignation.name}
        </span>
      ),
    },
    {
      title: "Proposed Department",
      dataIndex: "Proposed Department",
      key: "Proposed Department",
      ellipsis: true,

      render: (_, item) => (
        <span className="capitalize">
          {item?.transferRequisition?.proposedDesignation.department.name}
        </span>
      ),
    },
    {
      title: "Proposed branch",
      dataIndex: "Proposed branch",
      key: "Proposed branch",
      ellipsis: true,

      render: (_, item) => (
        <span className="capitalize">
          {item?.transferRequisition?.proposedBranch.name}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span
          className="capitalize"
          style={{
            color: getAppropriateColorForStatus(
              item?.transferRequisition?.status ?? ""
            ),
          }}
        >
          {item?.transferRequisition?.status}{" "}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, item) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="3"
                  onClick={() => {
                    setShowD(true);
                    setRequest(item);
                  }}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  hidden={item?.transferRequisition?.status !== "pending"}
                  key="2"
                  onClick={() =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "approved",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                      requires2FA: item?.advancedStage?.enableTwoFactorAuth,
                    })
                  }
                >
                  Approve
                </Menu.Item>
                <Menu.Item
                  hidden={item?.transferRequisition?.status !== "pending"}
                  key="1"
                  onClick={() =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "rejected",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                    })
                  }
                >
                  Reject
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <AiOutlineMore />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const columns = originalColumns;

  return (
    <div>
      {request?.transferRequisition?.id && (
        <TransferDetails
          open={showD}
          handleClose={() => setShowD(false)}
          id={request?.transferRequisition?.id}
          approvalRequest={request}
        />
      )}

      <TableWithFocusType
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default TransferApprovalRequestsTable;
