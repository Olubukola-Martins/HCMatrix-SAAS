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
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

const AllLeaveRecallsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
  startDate?: string;
  endDate?: string;
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
      render: (val, item) => <span>{getEmployeeFullName(item.employee)}</span>,
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
    },
    {
      title: "Recalled by",
      dataIndex: "Recalled by",
      key: "Recalled by",
      ellipsis: true,
      render: (val, item) => <span>{`James Owolo`}</span>,
    },
    {
      title: "Recalled At",
      dataIndex: "recalledAt",
      key: "recalledAt",
      render: (val, item) => (
        <span>
          {item.startDate ? moment(item.startDate).format("YYYY/MM/DD") : "N/A"}
        </span>
      ),
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
      title: "Previous End Date",
      dataIndex: "endDate",
      key: "endDate",
      ellipsis: true,
      render: (val, item) => (
        <span>
          {item.endDate ? moment(item.endDate).format("YYYY/MM/DD") : "N/A"}
        </span>
      ),
    },
    {
      title: "New End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (val, item) => (
        <span>
          {item.endDate ? moment(item.endDate).format("YYYY/MM/DD") : "N/A"}
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

export default AllLeaveRecallsTable;
