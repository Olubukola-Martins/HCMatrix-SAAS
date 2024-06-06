import { Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import React from "react";
import { ColumnsType } from "antd/lib/table";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { TApprovalStatus } from "types/statuses";
import moment from "moment";
import { useApproveORReject } from "hooks/useApproveORReject";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_EXIT_HAND_OVER_FORMS } from "../../hooks/useGetExitHandOverForms";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { appRoutes } from "config/router/paths";
import { Link } from "react-router-dom";

const HandOverApprovalRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const queryClient = useQueryClient();

  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "exit-handover-form",
  });

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_EXIT_HAND_OVER_FORMS],
        // exact: true,
      });
    },
  });

  const originalColumns: ColumnsType<TApprovalRequest> = [
    {
      title: "Employee Name",
      dataIndex: "emp",
      key: "emp",
      render: (_, item) => (
        <Link to={appRoutes.handOverDetails(item.exitHandoverForm?.id).path}>
          <span className="capitalize text-caramel">
            {getEmployeeFullName(item.exitHandoverForm?.employee)}{" "}
          </span>
        </Link>
      ),
    },
    {
      title: "Seperation Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>
          {moment(item?.exitHandoverForm?.separationDate).format(
            DEFAULT_DATE_FORMAT
          )}{" "}
        </span>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "emp_uid",
      key: "emp_uid",
      render: (_, item) => (
        <span className="capitalize">
          {item.exitHandoverForm?.employee.empUid}{" "}
        </span>
      ),
    },

    {
      title: "Reason",
      dataIndex: "reas",
      key: "reas",
      render: (_, item) => (
        <span className="capitalize">
          {item.exitHandoverForm?.reasonForLeaving}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span style={{ color: getAppropriateColorForStatus(item.status) }}>
          {item.status}{" "}
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
                  hidden={item.exitHandoverForm?.status !== "pending"}
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
                  hidden={item.exitHandoverForm?.status !== "pending"}
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
      <Table
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

export default HandOverApprovalRequestsTable;
