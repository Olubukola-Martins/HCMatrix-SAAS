import { Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { useQueryClient } from "react-query";
import { useFetchApprovalRequests } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { useApproveORReject } from "hooks/useApproveORReject";
import { QUERY_KEY_FOR_LEAVES } from "../../leave/hooks/useFetchLeaves";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { ViewVehicleBooking } from "./ViewVehicleBooking";
import { TApprovalStatus } from "types/statuses";

const VBApprovalRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const queryClient = useQueryClient();

  const [showD, setShowD] = useState(false);
  const [requestId, setRequestId] = useState<number>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useFetchApprovalRequests({
    pagination,
    type: "vehicle",
  });
  console.log("vehi", data);

  const { confirmApprovalAction } = useApproveORReject({
    handleSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_FOR_LEAVES],
        // exact: true,
      });
    },
  });

  const originalColumns: ColumnsType<TApprovalRequest> = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val, item) =>
        moment(item.vehicleBooking?.createdAt).format("YYYY-MM-DD"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span>
          {item.vehicleBooking?.employee.firstName}{" "}
          {item.vehicleBooking?.employee.lastName}
        </span>
      ),
    },

    {
      title: "Employee ID",
      dataIndex: "Employee ID",
      key: "Employee ID",
      render: (_, item) => <span>{item.vehicleBooking?.employee.empUid}</span>,
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (_, item) => <span>{"N/A"}</span>,
    },
    {
      title: "Destination",
      dataIndex: "Destination",
      key: "Destination",
      render: (_, item) => <span>{item.vehicleBooking?.destination}</span>,
    },

    {
      title: "Duration(hrs)",
      dataIndex: "endTime",
      key: "endTime",
      render: (_, item) => item.vehicleBooking?.duration,
    },

    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val: string) => (
        <span
          className="capitalize"
          style={{ color: getAppropriateColorForStatus(val) }}
        >
          {val}
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
                    setRequestId(item.vehicleBooking?.id);
                  }}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  hidden={item.vehicleBooking?.status !== "pending"}
                  key="2"
                  onClick={() =>
                    confirmApprovalAction({
                      approvalStageId: item?.id,
                      status: "rejected",
                      workflowType: !!item?.basicStageId ? "basic" : "advanced",
                      requires2FA: item?.advancedStage?.enableTwoFactorAuth,
                    })
                  }
                >
                  Approve
                </Menu.Item>
                <Menu.Item
                  hidden={item.vehicleBooking?.status !== "pending"}
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
  const columns = employeeId
    ? originalColumns.filter((item) => item.key !== "name")
    : originalColumns;
  return (
    <div>
      {requestId && (
        <ViewVehicleBooking
          bookingId={requestId}
          handleClose={() => setShowD(false)}
          open={showD}
        />
      )}

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

export default VBApprovalRequestsTable;
