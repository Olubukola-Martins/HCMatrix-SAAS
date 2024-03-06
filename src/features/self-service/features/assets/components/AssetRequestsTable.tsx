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
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";

export const AssetRequestsTable: React.FC<{
  status?: TApprovalStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [requestId, setRequestId] = useState<number>();
  const [action, setAction] = useState<"view" | "view-approval-stages">();
  const handleAction = (
    action: "view" | "view-approval-stages",
    item?: TAssetRequisition
  ) => {
    setRequestId(item?.id);
    setAction(action);
  };
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
      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">{item.description} </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span
          style={{ color: getAppropriateColorForStatus(item.status) }}
          className="capitalize"
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
              <Menu.Item key="3" onClick={() => handleAction("view", item)}>
                View Details
              </Menu.Item>
              <Menu.Item
                key="300"
                onClick={() => handleAction("view-approval-stages", item)}
              >
                View Approval Stages
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button title="Actions" icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {requestId && (
        <AssetRequestDetails
          open={action === "view"}
          handleClose={() => setAction(undefined)}
          id={requestId}
        />
      )}
      {requestId && (
        <ViewApprovalStages
          handleClose={() => setAction(undefined)}
          open={action === "view-approval-stages"}
          id={requestId}
          type="asset"
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
