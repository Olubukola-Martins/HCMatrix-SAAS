import { Space, Dropdown, Menu, Table, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { TApprovalStatus } from "types/statuses";
import moment from "moment";
import { useFetchLeaves } from "../../hooks/useFetchLeaves";
import { TLeave } from "../../types";
import { LeaveDetails } from "../LeaveDetails";
import { RecallLeave } from "../leave-recalls/RecallLeave";

const AllLeaveRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
  startDate?: string;
  endDate?: string;
}> = ({ status, employeeId }) => {
  const [showD, setShowD] = useState<"view" | "recall">();
  const [request, setRequest] = useState<TLeave>();
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
      ellipsis: true,
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
      title: "Specific Dates",
      dataIndex: "specificDates",
      key: "specificDates",
      ellipsis: true,
      render: (val, item) => <span>{item.specificDates?.join(",")}</span>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (val, item) => (
        <span>
          {item.startDate ? moment(item.startDate).format("YYYY/MM/DD") : "N/A"}
        </span>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (val, item) => (
        <span>
          {item.endDate ? moment(item.endDate).format("YYYY/MM/DD") : "N/A"}
        </span>
      ),
    },

    {
      title: "Leave Length",
      dataIndex: "leaveLength",
      key: "leaveLength",
      render: (val, item) => <span>{item.length}</span>,
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
                    setShowD("view");
                    setRequest(item);
                  }}
                >
                  View
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => {
                    setShowD("recall");
                    setRequest(item);
                  }}
                >
                  Recall Leave
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
      <Modal
        open={showD === "view"}
        onCancel={() => setShowD(undefined)}
        title={"Booking Details"}
        style={{ top: 10 }}
        footer={null}
      >
        {request && <LeaveDetails id={request?.id} />}
      </Modal>
      <RecallLeave
        open={showD === "recall"}
        handleClose={() => setShowD(undefined)}
        leave={request}
      />

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

export default AllLeaveRequestsTable;
