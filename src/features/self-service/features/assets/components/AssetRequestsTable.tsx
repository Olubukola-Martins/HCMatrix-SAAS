import React, { useState } from "react";
import { TApprovalStatus } from "types/statuses";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";

import { AssetRequestDetails } from "./AssetRequestDetails";
import { TAssetRequisition } from "../../requisitions/types/asset";
import { useGetAssetRequisitions } from "../../requisitions/hooks/asset/useGetAssetRequisitions";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

export const AssetRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [requestId, setRequestId] = useState<number>();
  const { companyId, token } = useApiAuth();
  const { pagination, onChange } = usePagination({
    pageSize: 4,
  });
  const { data, isFetching } = useGetAssetRequisitions({
    companyId,
    token,
    status,
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
    },
    employeeId,
  });

  const columns: ColumnsType<TAssetRequisition> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.date).format("YYYY/MM/DD")} </span>
      ),
    },

    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
      render: (_, item) => (
        <span className="capitalize">{item.asset.name} </span>
      ),
    },
    {
      title: "Employee",
      dataIndex: "emp",
      key: "emp",
      render: (_, item) => (
        <span className="capitalize">
          {getEmployeeFullName(item.employee)}{" "}
        </span>
      ),
    },

    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      render: (_, item) => (
        <span className="capitalize">{item.description} </span>
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
        <AssetRequestDetails
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
