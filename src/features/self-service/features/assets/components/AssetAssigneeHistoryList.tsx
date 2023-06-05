import React from "react";
import { TAsset, TAssetAssigneeHistory } from "../types";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";

export const AssetAssigneeHistoryList: React.FC<{ asset: TAsset }> = ({
  asset,
}) => {
  const { pagination, onChange } = usePagination();
  const columns: ColumnsType<TAssetAssigneeHistory> = [
    {
      title: "Assignee Name",
      dataIndex: "Assignee Name",
      key: "Assignee Name",
      render: (_, item) => (
        <span className="capitalize">
          {item.assignee.firstName} {item.assignee.lastName}
        </span>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "Employee ID",
      key: "Employee ID",
      render: (_, item) => (
        <span className="uppercase">{item.assignee.empUid}</span>
      ),
    },
    {
      title: "Job Role",
      dataIndex: "job",
      key: "job",
      render: (_, item) => <span className="capitalize">{`N/A`}</span>,
    },

    {
      title: "Department",
      dataIndex: "Department",
      key: "Department",
      render: (_, item) => <span className="capitalize">{`N/A`}</span>,
    },
    {
      title: "Date Assigned",
      dataIndex: "Date Assigned",
      key: "Date Assigned",
      render: (_, item) => (
        <span className="capitalize">
          {item.dateAssigned && moment(item.dateAssigned).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Date Returned",
      dataIndex: "Date Returned",
      key: "Date Returned",
      render: (_, item) => (
        <span className="capitalize">
          {item.dateReturned && moment(item.dateReturned).format("YYYY-MM-DD")}
        </span>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <Table
        columns={columns}
        size="small"
        dataSource={asset.assigneeHistory}
        pagination={{ ...pagination, total: asset.assigneeHistory.length }}
        onChange={onChange}
      />
    </div>
  );
};
