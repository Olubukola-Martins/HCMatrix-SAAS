import { Space, Dropdown, Menu, } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { TApprovalStatus } from "types/statuses";
import moment from "moment";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useQueryClient } from "react-query";
import { LeaveDetails } from "../LeaveDetails";
import { QUERY_KEY_FOR_ALL_LEAVES } from "../../hooks/useGetAllLeaves";
import { QUERY_KEY_FOR_EMPLOYEE_LEAVES } from "../../hooks/useGetEmployeeLeaves";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TableWithFocusType } from "components/table";

const LeavesApprovalRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const queryClient = useQueryClient();

  const [showD, setShowD] = useState<"view">();
  const [request, setRequest] = useState<TApprovalRequest>();

  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "leave",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_ALL_LEAVES],
        // exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_EMPLOYEE_LEAVES],
        // exact: true,
      });
    },
  });

  const originalColumns: ColumnsType<TApprovalRequest> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span>{getEmployeeFullName(item.leave?.employee)}</span>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (val, item) => <span>{item.leave?.department?.name}</span>,
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (val, item) => <span>{item.leave?.leaveType.name}</span>,
    },
    {
      title: "Specific Dates",
      dataIndex: "specificDates",
      key: "specificDates",
      ellipsis: true,
      render: (val, item) => (
        <span>{item.leave?.specificDates?.join(",")}</span>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (val, item) => (
        <span>
          {item.leave?.startDate
            ? moment(item.leave?.startDate).format(DEFAULT_DATE_FORMAT)
            : "N/A"}
        </span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (val, item) => (
        <span>
          {item.leave?.endDate
            ? moment(item.leave?.endDate).format(DEFAULT_DATE_FORMAT)
            : "N/A"}
        </span>
      ),
    },

    {
      title: "Leave Length",
      dataIndex: "leaveLength",
      key: "leaveLength",
      render: (val, item) => <span>{item?.leave?.length}</span>,
    },
    {
      title: "With Pay",
      dataIndex: "withPay",

      key: "withPay",
      render: (val, item) => (
        <span>{item?.leave?.requestAllowance ? "Yes" : "No"}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val, item) => (
        <span
          className="capitalize"
          style={{
            color: getAppropriateColorForStatus(item?.leave?.status ?? ""),
          }}
        >
          {item?.leave?.status}
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
                    setShowD("view");
                    setRequest(item);
                  }}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  hidden={item.leave?.status !== "pending"}
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
                  hidden={item.leave?.status !== "pending"}
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
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const columns = originalColumns;

  return (
    <div>
      {request?.leave && (
        <LeaveDetails
          id={request.leave.id}
          handleClose={() => setShowD(undefined)}
          open={showD === "view"}
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

export default LeavesApprovalRequestsTable;
