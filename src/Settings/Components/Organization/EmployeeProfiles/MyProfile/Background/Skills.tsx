import Search from "antd/lib/input/Search";
import { Space, Table } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { SaveSkill } from "./SaveSkill";
import { TEmployee, TSkill } from "AppTypes/DataEntitities";

interface IProps {
  employee?: TEmployee;
}

export const Skills = ({ employee }: IProps) => {
  const [skill, setSkill] = useState<TSkill>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const editSkill = (val: TSkill) => {
    setSkill(val);
    setOpenDrawer(true);
  };
  const columns: ColumnsType<TSkill> = [
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
          <i
            className="ri-pencil-line text-xl cursor-pointer"
            onClick={() => editSkill(record)}
          />
          <i className="ri-delete-bin-line text-lg cursor-pointer" />
        </Space>
      ),
    },
  ];

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

        <SaveSkill
          open={openDrawer}
          handleClose={() => setOpenDrawer(false)}
          employeeId={employee?.id}
          skill={skill}
        />

        <Table
          columns={columns}
          dataSource={employee?.skills}
          pagination={{ pageSize: 4, total: employee?.skills?.length }}
          scroll={{ y: 240 }}
          size="small"
        />
      </div>
    </div>
  );
};
