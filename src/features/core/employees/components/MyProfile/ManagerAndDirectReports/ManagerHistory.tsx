import { Input, Table } from "antd";
import { TSingleEmployee } from "features/core/employees/types";
import { useState, useEffect } from "react";
import { usePagination } from "hooks/usePagination";
import { ColumnsType } from "antd/lib/table";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import dayjs from "dayjs";

interface IProps {
  histories?: TSingleEmployee["managerHistory"];
}

export const ManagerHistory: React.FC<IProps> = ({ histories = [] }) => {
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [data, setData] = useState<TSingleEmployee["managerHistory"]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = histories?.filter(
      (item) =>
        getEmployeeFullName(item.lineManager)
          .toLowerCase()
          .indexOf(search?.toLowerCase() ?? "") !== -1
    );
    setData(result);
  }, [search, histories]);
  const columns: ColumnsType<TSingleEmployee["managerHistory"][0]> = [
    {
      title: "Name",
      dataIndex: "na",
      render: (_, val) => (
        <span className="capitalize">
          {getEmployeeFullName(val.lineManager)}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "comp",
      render: (_, val) => <span className="">{val.lineManager.email}</span>,
    },
    {
      title: "Started",
      dataIndex: "cs",
      render: (_, val) => (
        <span className="">{dayjs(val.from).format("YYYY-MM-DD")}</span>
      ),
    },
    {
      title: "Ended",
      dataIndex: "ce",
      render: (_, val) => (
        <span className="">
          {val.to ? dayjs(val.to).format("YYYY-MM-DD") : "Ongoing"}
        </span>
      ),
    },
    {
      title: "Current Manager",
      dataIndex: "cM",
      render: (_, val) => (
        <span className="">{val.currentManager ? "Yes" : "No"}</span>
      ),
    },
  ];
  return (
    <>
      {" "}
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <h2 className="font-medium text-lg mb-4">Manager Histories</h2>
        <div className="bg-card p-3 rounded">
          <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
            <Input
              placeholder="Search histories"
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
