import Search from "antd/lib/input/Search";
import { Space, Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { AddEmploymentHistory } from "./AddEmploymentHistory";

interface DataType {
  key: React.Key;
  organization: string;
  position: string;
  startedOn: string;
  ended: string;
  action: any;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Organization",
    dataIndex: "organization",
    // width: 150,
  },
  {
    title: "Position",
    dataIndex: "position",
    // width: 150,
  },
  {
    title: "Started On",
    dataIndex: "startedOn",
  },
  {
    title: "Ended",
    dataIndex: "ended",
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
    organization: "Micro soft",
    position: "Front end",
    startedOn: "20/2/2015",
    ended: "20/2/2020",
    action: "action",
  });
}

export const EmploymentHistory = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Employment History</h2>
        </div>
        <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
          <Search
            placeholder="input search text"
            style={{ width: 200 }}
            className="rounded"
          />
          <div>
            <button className="button" onClick={() => setOpenDrawer(true)}>
              Add Employment History
            </button>
          </div>
        </div>

        <AddEmploymentHistory
          open={openDrawer}
          handleClose={() => setOpenDrawer(false)}
        />

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
