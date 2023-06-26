import { Space, Dropdown, Menu, Table, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";
import { useGetAssets } from "../hooks/useGetAssets";
import { useApiAuth } from "hooks/useApiAuth";
import { TAsset, TAssetStatus } from "../types";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

const AssetListTable: React.FC<{
  typeId?: number;
  employeeId?: number;
  status?: TAssetStatus;
}> = ({ typeId, employeeId, status }) => {
  const { token, companyId } = useApiAuth();
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetAssets({
    pagination,
    companyId,
    token,
    status,
    typeId,
  });

  const originalColumns: ColumnsType<TAsset> = [
    {
      title: "Asset Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <Link to={appRoutes.assetDetails(item.id).path}>
          <span className="capitalize text-caramel hover:underline">
            {item.name}
          </span>
        </Link>
      ),

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Asset ID",
      dataIndex: "uid",
      key: "uid",
      render: (_, item) => item.uid,
    },
    {
      title: "Asset Type",
      dataIndex: "asty",
      key: "asty",
      render: (_, item) => <span className="capitalize">{item.type.name}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "State",
      dataIndex: "State",
      key: "State",
      ellipsis: true,
      render: (_, item) => <span className="capitalize">{item.status}</span>,

      // width: 100,
    },
    {
      title: "Color",
      dataIndex: "Color",
      key: "Color",
      render: (_, item) => <span className="capitalize">{item.color}</span>,
    },
    {
      title: "Serial No.",
      dataIndex: "serialNo",
      key: "serialNo",
      render: (_, item) => (
        <span className="capitalize">{item.serialNumber}</span>
      ),
    },
    {
      title: "Assigned to",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (_, item) => (
        <span className="capitalize">
          {item.assignee?.firstName} {item.assignee?.lastName}
        </span>
      ),
    },
  ];
  const columns = employeeId
    ? originalColumns.filter((item) => item.key !== "name")
    : originalColumns;
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

export default AssetListTable;
