import Search from "antd/lib/input/Search";
import { Space, Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

interface DataType {
  key: React.Key;
  name: string;
  action: any;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    // width: 150,
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <i className="ri-delete-bin-line text-lg cursor-pointer"></i>
        <a>
          <i className="ri-pencil-line text-xl cursor-pointer"></i>
        </a>
      </Space>
    ),
  },
];

const data: DataType[] = [];
// for (let i = 0; i < 10; i++) {
//   data.push({
//     key: i,
//     name: "",
//     action: "action",
//   });
// }

export const FingerPrint = () => {
  return (
    <div className="bg-mainBg shadow-sm rounded-md py-6 px-4 mt-5">
      <div className="bg-card p-3 rounded">
        <div className="my-3">
          <Search
            placeholder="input search text"
            style={{ width: 200 }}
            className="rounded"
          />
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
        />
      </div>
    </div>
  );
};
