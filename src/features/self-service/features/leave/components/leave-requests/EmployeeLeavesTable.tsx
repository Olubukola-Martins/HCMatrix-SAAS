import { Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { usePagination } from "hooks/usePagination";
import { TApprovalStatus } from "types/statuses";
import moment from "moment";
import { TLeave } from "../../types";
import { LeaveDetails } from "../LeaveDetails";
import { useGetEmployeeLeaves } from "../../hooks/useGetEmployeeLeaves";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

const EmployeeLeavesTable: React.FC<{
  status?: TApprovalStatus[];
}> = ({ status }) => {
  const [showD, setShowD] = useState<"view">();

  const [request, setRequest] = useState<TLeave>();

  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetEmployeeLeaves({
    pagination,
    status,
  });

  const columns: ColumnsType<TLeave> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span>{getEmployeeFullName(item.employee)}</span>,

      ellipsis: true,

      // width: 100,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      ellipsis: true,
      render: (val, item) => (
        <span>{item.employee?.designation?.department.name}</span>
      ),
    },

    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      render: (val, item) => <span>{item.leaveType.name}</span>,
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
        <span>{item.leaveType.employeesGetAllowance ? "Yes" : "No"}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val, item) => (
        <span
          className="capitalize"
          style={{ color: getAppropriateColorForStatus(item.status) }}
        >
          {item.status}
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
      {request && (
        <LeaveDetails
          id={request?.id}
          open={showD === "view"}
          handleClose={() => setShowD(undefined)}
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

export default EmployeeLeavesTable;
