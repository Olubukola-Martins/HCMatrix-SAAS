import { Table } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { TPayGrade } from "features/payroll/types";
import { useGetPayGrades } from "features/payroll/hooks/payGrades/useGetPayGrades";

type TAction = "view";

const EmployeePayslipsTable: React.FC<{
  categoryId?: number;
}> = ({ categoryId }) => {
  const [action, setAction] = useState<TAction>();
  const [grade, setGrade] = useState<TPayGrade>();
  const handleAction = ({
    action,
    grade,
  }: {
    action: TAction;
    grade: TPayGrade;
  }) => {
    setAction(action);
    setGrade(grade);
  };
  const cancelAction = () => {
    setAction(undefined);
    setGrade(undefined);
  };
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetPayGrades({
    pagination,
  });

  const columns: ColumnsType<TPayGrade> = [
    {
      title: "Pay Date",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{`01/09/2023`}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Name",
      dataIndex: "cat",
      key: "cat",
      render: (_, item) => `Jon Doe`,
    },
    {
      title: "Scheme",
      dataIndex: "pay",
      key: "pay",
      render: (_, item) => `office`,
    },
    {
      title: "Net Pay",
      dataIndex: "pay",
      key: "pay",
      render: (_, item) => 2000,
    },
    {
      title: "Gross Pay",
      dataIndex: "pay",
      key: "pay",
      render: (_, item) => 7000,
    },
    {
      title: "Total Allowances",
      dataIndex: "pay",
      key: "pay",
      render: (_, item) => 7000,
    },
    {
      title: "Total Deductions",
      dataIndex: "pay",
      key: "pay",
      render: (_, item) => 7000,
    },
    {
      title: "Tax",
      dataIndex: "pay",
      key: "pay",
      render: (_, item) => 7000,
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <div className="flex gap-2">
          <i
            className="ri-eye-fill text-lg cursor-pointer"
            onClick={() => handleAction({ action: "view", grade: item })}
          />
          <i
            className="ri-download-line text-lg cursor-pointer"
            onClick={() => handleAction({ action: "view", grade: item })}
          />
        </div>
      ),
    },
  ];

  return (
    <>
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

export default EmployeePayslipsTable;
