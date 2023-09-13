import { Button, Table, Tag } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";
import moment from "moment";
import { DeleteFilled, DownloadOutlined } from "@ant-design/icons";
import DeletePayrollReport from "./DeletePayrollReport";
import { useGetPayrollReports } from "features/payroll/hooks/payroll/report/useGetPayrollReports";
import { TPayrollReport } from "features/payroll/types/payroll/report";

type TAction = "delete" | "download";

const PayrollReportTable: React.FC = () => {
  const [action, setAction] = useState<TAction>();
  const [category, setCategory] = useState<TPayrollReport>();
  const handleAction = ({
    action,
    category,
  }: {
    action: TAction;
    category: TPayrollReport;
  }) => {
    setAction(action);
    setCategory(category);
  };
  const cancelAction = () => {
    setAction(undefined);
    setCategory(undefined);
  };

  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetPayrollReports({
    data: {
      pagination,
    },
  });

  const columns: ColumnsType<TPayrollReport> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item?.name}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Description",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span className="capitalize">{item?.description}</span>
      ),

      ellipsis: true,
    },
    {
      title: "Template",
      dataIndex: "max",
      key: "max",
      render: (_, item) => <span>{item.template.name}</span>,
    },

    {
      title: "From",
      dataIndex: "update",
      key: "update",
      render: (_, item) => moment(item.fromDate).format(`MMMM DD, YYYY`),
    },
    {
      title: "To",
      dataIndex: "update",
      key: "update",
      render: (_, item) => moment(item.toDate).format(`MMMM DD, YYYY`),
    },
    {
      title: "Schemes",
      dataIndex: "schemes",
      key: "schemes",
      render: (_, item) => (
        <div className="flex gap-3">
          {item.schemes.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createAr",
      key: "createAr",
      render: (_, item) => moment(item.createdAt).format(`YYYY-MM-DD`),
    },

    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <div>
          <Button
            icon={<DownloadOutlined />}
            type="text"
            onClick={() => handleAction({ action: "download", category: item })}
          />
          <Button
            icon={<DeleteFilled />}
            type="text"
            onClick={() => handleAction({ action: "delete", category: item })}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {category && (
        <DeletePayrollReport
          category={category}
          open={action === "delete"}
          handleClose={() => cancelAction()}
        />
      )}
      <Table
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </>
  );
};

export default PayrollReportTable;
