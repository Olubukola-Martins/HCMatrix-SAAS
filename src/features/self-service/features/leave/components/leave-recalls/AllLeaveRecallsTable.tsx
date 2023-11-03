import { Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";
import moment from "moment";
import { TLeaveRecall } from "../../types";
import { LeaveDetails } from "../LeaveDetails";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { useGetAllLeaveRecalls } from "../../hooks/leaveRecall/useGetAllLeaveRecalls";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

const AllLeaveRecallsTable: React.FC<{
  employeeId?: number;
}> = ({ employeeId }) => {
  const [showD, setShowD] = useState<"view">();
  const [requestId, setRequestId] = useState<number>();
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetAllLeaveRecalls({
    pagination,
    employeeId,
  });

  const columns: ColumnsType<TLeaveRecall> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span>{getEmployeeFullName(item.leave.employee)}</span>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      ellipsis: true,
      render: (val, item) => (
        <span>{item.leave.employee?.designation?.department?.name}</span>
      ),
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (val, item) => <span>{item.leave.leaveType.name}</span>,
    },
    {
      title: "Recalled by",
      dataIndex: "Recalled by",
      key: "Recalled by",
      ellipsis: true,
      render: (val, item) => <span>{"N/A"}</span>,
    },
    {
      title: "Recalled At",
      dataIndex: "recalledAt",
      key: "recalledAt",
      render: (val, item) => (
        <span>
          {item.createdAt
            ? moment(item.createdAt).format(DEFAULT_DATE_FORMAT)
            : "N/A"}
        </span>
      ),
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (val, item) => (
        <span>
          {item.leave.startDate
            ? moment(item.leave.startDate).format(DEFAULT_DATE_FORMAT)
            : "N/A"}
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
          {item.leave.endDate
            ? moment(item.leave.endDate).format(DEFAULT_DATE_FORMAT)
            : "N/A"}
        </span>
      ),
    },
    {
      title: "New End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (val, item) => (
        <span>
          {item.newEndDate
            ? moment(item?.newEndDate).format(DEFAULT_DATE_FORMAT)
            : "N/A"}
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
                    setRequestId(item.leaveId);
                  }}
                >
                  View Leave Details
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

  return (
    <div>
      {requestId && (
        <LeaveDetails
          id={requestId}
          open={showD === "view"}
          handleClose={() => setShowD}
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

export default AllLeaveRecallsTable;
