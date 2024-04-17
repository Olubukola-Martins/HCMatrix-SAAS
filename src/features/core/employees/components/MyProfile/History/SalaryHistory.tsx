import { ColumnsType } from "antd/lib/table";
import { Input, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { usePagination } from "hooks/usePagination";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TSingleEmployee } from "features/core/employees/types";
import { formatNumberWithCommas } from "utils/dataHelpers/formatNumberWithCommas";

export const SalaryHistory: React.FC<{
  data?: TSingleEmployee["salaryHistory"];
}> = ({ data = [] }) => {
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [histories, setHistories] = useState<TSingleEmployee["salaryHistory"]>(
    []
  );
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = data?.filter(
      (item) =>
        item?.monthlyGross
          ?.toLowerCase()
          .indexOf(search?.toLowerCase() ?? "") !== -1 ||
        item?.hourlyRate?.toLowerCase().indexOf(search?.toLowerCase() ?? "") !==
          -1 ||
        item?.frequency?.toLowerCase().indexOf(search?.toLowerCase() ?? "") !==
          -1 ||
        item?.type?.toLowerCase().indexOf(search?.toLowerCase() ?? "") !== -1
    );
    setHistories(result);
  }, [search, data]);
  const columns: ColumnsType<TSingleEmployee["salaryHistory"][0]> = [
    {
      title: "Monthly Gross",
      dataIndex: "monthly",
      key: "monthly",
      render: (_, item) => (
        <span className="capitalize">
          {formatNumberWithCommas(item?.monthlyGross ?? 0)}
        </span>
      ),
    },
    {
      title: "Scheme",
      dataIndex: "type",
      key: "type",
      render: (_, item) => (
        <span className="capitalize">{item?.type.split("_").join(" ")}</span>
      ),
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      render: (_, item) => (
        <span className="capitalize">{item?.frequency}</span>
      ),
    },
    {
      title: "Hourly Rate",
      dataIndex: "hourly rate",
      key: "hourly rate",
      render: (_, item) => (
        <span className="capitalize">{item?.hourlyRate}</span>
      ),
    },

    {
      title: "Started",
      dataIndex: "createAr",
      key: "createAr",
      render: (_, item) => moment(item.from).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Ended",
      dataIndex: "update",
      key: "update",
      render: (_, item) => (
        <span className="">
          {item.to ? moment(item.to).format(DEFAULT_DATE_FORMAT) : "Ongoing"}
        </span>
      ),
    },
  ];
  return (
    <div>
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Salary History</h2>
        </div>
        <div className="my-3 flex justify-end">
          <Input.Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search History"
            style={{ width: 200 }}
            className="rounded"
          />
        </div>

        <Table
          columns={columns}
          size="small"
          dataSource={histories}
          pagination={{ ...pagination, total: histories.length }}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
