import { ColumnsType } from "antd/lib/table";
import { Input, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { usePagination } from "hooks/usePagination";

type TEmployeeProject = {
  name: string;
  grossIncome: number;
  id: number;
  totalPaid: number;
  noOfPaymentsMade: string;
  startDate: string;
  endDate: string;
};
export const EmployeeProjects: React.FC<{ data?: TEmployeeProject[] }> = ({
  data = [],
}) => {
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [projects, setProjects] = useState<TEmployeeProject[]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = data?.filter(
      (item) =>
        item.name.toLowerCase().indexOf(search?.toLowerCase() ?? "") !== -1
    );
    setProjects(result);
  }, [search, data]);
  const columns: ColumnsType<TEmployeeProject> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item?.name}</span>,
    },
    {
      title: "Gross Income",
      dataIndex: "income",
      key: "income",
      render: (val, item) => (
        <span className="capitalize">{item?.grossIncome}</span>
      ),
    },
    {
      title: "Total Paid",
      dataIndex: "cat",
      key: "cat",
      render: (_, item) => item.totalPaid,
    },
    {
      title: "No of Payments Made",
      dataIndex: "pay",
      key: "pay",
      render: (_, item) => item.noOfPaymentsMade,
    },
    {
      title: "Project Began",
      dataIndex: "createAr",
      key: "createAr",
      render: (_, item) => moment(item.startDate).format(`YYYY-MM-DD`),
    },
    {
      title: "Project Ends At",
      dataIndex: "update",
      key: "update",
      render: (_, item) => moment(item.endDate).format(`YYYY-MM-DD`),
    },
  ];
  return (
    <div>
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">User Projects</h2>
        </div>
        <div className="my-3 flex justify-end">
          <Input.Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Projects"
            style={{ width: 200 }}
            className="rounded"
          />
        </div>

        <Table
          columns={columns}
          size="small"
          dataSource={projects}
          pagination={{ ...pagination, total: projects.length }}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
