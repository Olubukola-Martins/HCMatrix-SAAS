import Search from "antd/lib/input/Search";
import { Space, Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { AddSkill } from "./AddSkill";

interface DataType {
  key: React.Key;
  skill: string;
  competency: string;
  action: any;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Skill",
    dataIndex: "skill",
    // width: 150,
  },
  {
    title: "Competency",
    dataIndex: "competency",
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
//     skill: "",
//     competency: "",
//     action: "action",
//   });
// }

export const Skills = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Skills</h2>
        </div>
        <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
          <Search
            placeholder="input search text"
            style={{ width: 200 }}
            className="rounded"
          />
          <div>
            <button className="button" onClick={() => setOpenDrawer(true)}>
              Add Skill
            </button>
          </div>
        </div>

        <AddSkill
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
