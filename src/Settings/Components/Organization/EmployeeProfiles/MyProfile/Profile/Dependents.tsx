import Search from "antd/lib/input/Search";
import { Space, Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { AddDependents } from "./AddDependents";

interface DataType {
  key: React.Key;
  name: string;
  dateOfBirth: string;
  phone: any;
  address: string;
  relationship: string;
  action: any;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Date Of Birth",
    dataIndex: "dateOfBirth",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
  },
  {
    title: "Relationship",
    dataIndex: "relationship",
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
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: "Edward King",
    dateOfBirth: "10/7/1994",
    phone: "+234 090888995",
    address: "London, Park Lane no.",
    relationship: "Father",
    action: "action",
  });
}

export const Dependents = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
      <h2 className="font-medium text-lg mb-4">Dependents</h2>
      <div className="bg-card p-3 rounded">
        <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
          <Search
            placeholder="input search text"
            style={{ width: 200 }}
            className="rounded"
          />
          <div>
            <button className="button" onClick={() => setOpenDrawer(true)}>
              Add Dependents
            </button>
          </div>
        </div>

        <AddDependents
          open={openDrawer}
          handleClose={() => setOpenDrawer(false)}
        />

        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 50 }}
          scroll={{ x: "max-content", y: 240 }}
        />
      </div>
    </div>
  );
};
