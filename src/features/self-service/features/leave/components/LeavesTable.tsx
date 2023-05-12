import { Space, Dropdown, Menu, Table, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { useFetchLeaves } from "../hooks/useFetchLeaves";
import { TApprovalStatus } from "types/statuses";
import { TLeave } from "../types";
import { LeaveDetails } from "./LeaveDetails";
import moment from "moment";

const LeavesTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [showD, setShowD] = useState(false);
  const [requestId, setRequestId] = useState<number>();
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useFetchLeaves({
    pagination,
    status,
    employeeId,
  });

  const originalColumns: ColumnsType<TLeave> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span>
          {item.employee.firstName} {item.employee.lastName}
        </span>
      ),

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (val, item) => <span>{item.department.name}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (val, item) => <span>{item.leaveType.name}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (val, item) => (
        <span>{moment(item.startDate).format("YYYY/MM/DD")}</span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (val, item) => (
        <span>{moment(item.endDate).format("YYYY/MM/DD")}</span>
      ),
    },

    {
      title: "Leave Length",
      dataIndex: "leaveLength",
      key: "leaveLength",
      render: (val, item) => (
        <span>{moment(item.length).format("YYYY/MM/DD")}</span>
      ),
    },
    {
      title: "With Pay",
      dataIndex: "withPay",

      key: "withPay",
      render: (val, item) => (
        <span>{item.requestAllowance ? "Yes" : "No"}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val) => (
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
                    setRequestId(item.id);
                  }}
                >
                  View
                </Menu.Item>
                {/* <Menu.Item key="2">Approve</Menu.Item>
                  <Menu.Item key="1">Reject</Menu.Item> */}
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
      <Modal
        open={showD}
        onCancel={() => setShowD(false)}
        closeIcon={false}
        title={"Booking Details"}
        style={{ top: 10 }}
        footer={null}
      >
        {requestId && <LeaveDetails id={requestId} />}
      </Modal>

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

export default LeavesTable;
