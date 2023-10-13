import { ColumnsType } from "antd/lib/table";
import { Input, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { usePagination } from "hooks/usePagination";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";

type TDirectSalaryHistory = {
  startDate: string;
  endDate: string;
  monthlyGross: string;
};
export const DirectSalaryHistory: React.FC<{
  data?: TDirectSalaryHistory[];
}> = ({ data = [] }) => {
  const { pagination, onChange } = usePagination({ pageSize: 7 });
  const [histories, setHistories] = useState<TDirectSalaryHistory[]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const result = data?.filter(
      (item) =>
        item.monthlyGross.toLowerCase().indexOf(search?.toLowerCase() ?? "") !==
        -1
    );
    setHistories(result);
  }, [search, data]);
  const columns: ColumnsType<TDirectSalaryHistory> = [
    {
      title: "Monthly Gross",
      dataIndex: "monthly",
      key: "monthly",
      render: (val, item) => (
        <span className="capitalize">{item?.monthlyGross}</span>
      ),
    },

    {
      title: "Started",
      dataIndex: "createAr",
      key: "createAr",
      render: (_, item) => moment(item.startDate).format(DEFAULT_DATE_FORMAT),
    },
    {
      title: "Ended",
      dataIndex: "update",
      key: "update",
      render: (_, item) => moment(item.endDate).format(DEFAULT_DATE_FORMAT),
    },
  ];
  return (
    <div>
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Direct Salary History</h2>
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
          dataSource={histories}
          pagination={{ ...pagination, total: histories.length }}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
