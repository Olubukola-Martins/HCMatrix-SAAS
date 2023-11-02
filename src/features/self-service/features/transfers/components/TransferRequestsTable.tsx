import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";

import { TransferDetails } from "./TransferDetails";
import { TTransferRequisition } from "../../requisitions/types/transfer";
import { useGetTransferRequisitions } from "../../requisitions/hooks/transfer/useGetTransferRequisitions";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

export const TransferRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [requestId, setRequestId] = useState<number>();
  const { companyId, token } = useApiAuth();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetTransferRequisitions({
    companyId,
    token,
    status,
    employeeId,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
  });

  const columns: ColumnsType<TTransferRequisition> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">
          {item ? getEmployeeFullName(item.employee) : ""}
        </span>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "Employee ID",
      key: "Employee ID",
      render: (_, item) => (
        <span className="capitalize">{item.employee.empUid} </span>
      ),
    },
    {
      title: "Current Designation",
      dataIndex: "Current Designation",
      key: "Current Designation",
      ellipsis: true,

      render: (_, item) => (
        <span className="capitalize">{item.employee?.designation?.name}</span>
      ),
    },

    {
      title: "Current Department",
      dataIndex: "Current Department",
      key: "Current Department",

      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">
          {item.employee?.designation?.department.name}
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
          {item?.employee.jobInformation?.branch?.name}
        </span>
      ),
    },
    {
      title: "Proposed Designation",
      dataIndex: "Proposed Designation",
      key: "Proposed Designation",
      ellipsis: true,

      render: (_, item) => (
        <span className="capitalize">{item.proposedDesignation.name}</span>
      ),
    },
    {
      title: "Proposed Department",
      dataIndex: "Proposed Department",
      key: "Proposed Department",
      ellipsis: true,

      render: (_, item) => (
        <span className="capitalize">
          {item.proposedDesignation.department.name}
        </span>
      ),
    },
    {
      title: "Proposed branch",
      dataIndex: "Proposed branch",
      key: "Proposed branch",
      ellipsis: true,

      render: (_, item) => (
        <span className="capitalize">{item.proposedBranch.name}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span
          className="capitalize"
          style={{ color: getAppropriateColorForStatus(item.status) }}
        >
          {item.status}{" "}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="3"
                onClick={() => {
                  setRequestId(item.id);
                }}
              >
                View Details
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            title="Actions"
            icon={<MoreOutlined />}
            type="text"
            // onClick={() => handleEdit(item._id)}
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {requestId && (
        <TransferDetails
          open={!!requestId}
          handleClose={() => setRequestId(undefined)}
          id={requestId}
        />
      )}
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={columns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
