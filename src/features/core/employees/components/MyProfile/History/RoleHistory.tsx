import { ColumnsType } from "antd/lib/table";
import { Input, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { usePagination } from "hooks/usePagination";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TSingleEmployee } from "features/core/employees/types";

interface IProps {
  data?: TSingleEmployee["roleHistory"];
}

export const RoleHistory: React.FC<IProps> = ({ data = [] }) => {
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [roles, setRoles] = useState<TSingleEmployee["roleHistory"]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = data?.filter(
      (item) =>
        item.role.name.toLowerCase().indexOf(search?.toLowerCase() ?? "") !== -1
    );
    setRoles(result);
  }, [search, data]);
  const columns: ColumnsType<TSingleEmployee["roleHistory"][0]> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span className="capitalize">{item?.role.name}</span>
      ),
    },

    {
      title: "Started",
      dataIndex: "cs",
      render: (_, val) => (
        <span className="">{moment(val.from).format(DEFAULT_DATE_FORMAT)}</span>
      ),
    },
    {
      title: "Ended",
      dataIndex: "ce",
      render: (_, val) => (
        <span className="">
          {val.to ? moment(val.to).format(DEFAULT_DATE_FORMAT) : "Ongoing"}
        </span>
      ),
    },
  ];
  return (
    <div>
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Role History</h2>
        </div>
        <div className="my-3 flex justify-end">
          <Input.Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Role"
            style={{ width: 200 }}
            className="rounded"
          />
        </div>

        <Table
          columns={columns}
          size="small"
          dataSource={roles}
          pagination={{ ...pagination, total: roles.length }}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
