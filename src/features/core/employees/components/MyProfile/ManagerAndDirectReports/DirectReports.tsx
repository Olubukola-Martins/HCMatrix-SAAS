import { Input, Table } from "antd";
import { TSingleEmployee } from "features/core/employees/types";
import { useState, useEffect } from "react";
import { usePagination } from "hooks/usePagination";
import { ColumnsType } from "antd/lib/table";

import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

interface IProps {
  reports?: TSingleEmployee["directReport"];
}

export const DirectReports: React.FC<IProps> = ({ reports = [] }) => {
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [data, setData] = useState<TSingleEmployee["directReport"]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = reports?.filter(
      (item) =>
        getEmployeeFullName(item.employee)
          .toLowerCase()
          .indexOf(search?.toLowerCase() ?? "") !== -1
    );
    setData(result);
  }, [search, reports]);
  const columns: ColumnsType<TSingleEmployee["directReport"][0]> = [
    {
      title: "Name",
      dataIndex: "na",
      render: (_, val) => (
        <span className="capitalize">{getEmployeeFullName(val.employee)}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "comp",
      render: (_, val) => <span className="">{val.employee.email}</span>,
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
        <h2 className="font-medium text-lg mb-4">Direct Reports</h2>
        <div className="bg-card p-3 rounded">
          <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
            <Input
              placeholder="Search reports"
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
