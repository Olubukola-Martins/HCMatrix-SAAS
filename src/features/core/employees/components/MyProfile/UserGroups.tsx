import { Input, Table } from "antd";
import { TSingleEmployee } from "features/core/employees/types";
import { useState, useEffect } from "react";
import { usePagination } from "hooks/usePagination";
import { ColumnsType } from "antd/lib/table";

interface IProps {
  groups?: TSingleEmployee["userGroups"];
}

export const UserGroups: React.FC<IProps> = ({ groups = [] }) => {
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [data, setData] = useState<TSingleEmployee["userGroups"]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = groups?.filter(
      (item) =>
        item.group.name.toLowerCase().indexOf(search?.toLowerCase() ?? "") !==
        -1
    );
    setData(result);
  }, [search, groups]);
  const columns: ColumnsType<TSingleEmployee["userGroups"][0]> = [
    {
      title: "Name",
      dataIndex: "na",
      render: (_, val) => <span className="capitalize">{val.group.name}</span>,
    },
    {
      title: "Description",
      dataIndex: "comp",
      ellipsis: true,
      render: (_, val) => <span className="">{val.group.description}</span>,
    },

    {
      title: "Lead",
      dataIndex: "cM",
      render: (_, val) => <span className="">{val.isLead ? "Yes" : "No"}</span>,
    },
  ];
  return (
    <>
      {" "}
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <h2 className="font-medium text-lg mb-4">User groups</h2>
        <div className="bg-card p-3 rounded">
          <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
            <Input
              placeholder="Search groups"
              style={{ width: 200 }}
              className="rounded"
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
          </div>

          <Table
            columns={columns}
            size="small"
            dataSource={data}
            pagination={{ ...pagination, total: data.length }}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};
