import { Table } from "antd";

import React from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { TPayGrade } from "features/payroll/types";
import { useGetPayGrades } from "features/payroll/hooks/payGrades/useGetPayGrades";
import moment from "moment";

const PayGradesTable: React.FC<{
  categoryId?: number;
}> = ({ categoryId }) => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetPayGrades({
    pagination,
  });

  const columns: ColumnsType<TPayGrade> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item?.name}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Category",
      dataIndex: "cat",
      key: "cat",
      render: (_, item) => item.category.name,
    },
    {
      title: "Gross pay",
      dataIndex: "pay",
      key: "pay",
      render: (_, item) => item.grossPay,
    },
    {
      title: "Created At",
      dataIndex: "createAr",
      key: "createAr",
      render: (_, item) => moment(item.createdAt).format(`YYYY-MM-DD`),
    },
    {
      title: "Updated At",
      dataIndex: "update",
      key: "update",
      render: (_, item) => moment(item.updatedAt).format(`YYYY-MM-DD`),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default PayGradesTable;
