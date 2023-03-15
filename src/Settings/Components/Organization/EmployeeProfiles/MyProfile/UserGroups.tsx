import { Input, Table } from "antd";
import React from "react";
import { ColumnsType } from "antd/lib/table";
import { TEmployee, TUserGroup } from "AppTypes/DataEntitities";
import moment from "moment";

interface IProps {
  employee?: TEmployee;
}

const columns: ColumnsType<TUserGroup> = [
  {
    title: "Name",
    dataIndex: "name",
    render: (_, item) => <span className="capitalize">{item.name}</span>,
    // width: 150,
  },

  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Is Lead",
    dataIndex: "isLead",
    render: (val) => <span className="capitalize">{val ? "Yes" : "No"}</span>,

    // width: 150,
  },
];

export const UserGroups: React.FC<IProps> = ({ employee }) => {
  if (employee) {
    return (
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">User Groups</h2>
        </div>
        <div className="my-3 flex justify-end">
          <Input.Search
            placeholder="input search text"
            style={{ width: 200 }}
            className="rounded"
          />
        </div>

        <Table
          columns={columns}
          dataSource={employee.userGroups}
          size="small"
          pagination={{ pageSize: 4, total: employee?.userGroups?.length }}
          scroll={{ y: 240 }}
        />
      </div>
    );
  }
  return null;
};
