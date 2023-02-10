import Search from "antd/lib/input/Search";
import { Space, Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

interface DataType {
  key: React.Key;
  name: string;
  type: string;
  email: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    // width: 150,
  },
  {
    title: "Email",
    dataIndex: "email",
    // width: 150,
  },
  {
    title: "From",
    dataIndex: "from",
    // width: 150,
  },
  {
    title: "To",
    dataIndex: "to",
    // width: 150,
  },
  {
    title: "Currently reports to you",
    dataIndex: "type",
    width: 300,
  },
];

const data: DataType[] = [
  {
    name: "John",
    email: "jo@ho.vo",
    type: "Yes",
    key: "2",
  },
];
export const DirectReports = () => {
  return (
    <div className="bg-card p-3 rounded">
      <div className="border-b border-gray-400 w-full mb-7">
        <h2 className="text-accent text-base pb-1">Direct Report Records</h2>
      </div>
      <div className="my-3 flex justify-end">
        <Search
          placeholder="input search text"
          style={{ width: 200 }}
          className="rounded"
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        size="small"
        scroll={{ y: 240 }}
      />
    </div>
  );
};
