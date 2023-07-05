import { Table } from "antd";

import React from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { TPayGradeCategory } from "features/payroll/types";
import { useGetPayGradeCategories } from "features/payroll/hooks/payGrades/category/useGetPayGradeCategories";
import moment from "moment";

const PayGradeCategoriesTable: React.FC = () => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetPayGradeCategories({
    pagination,
  });

  const columns: ColumnsType<TPayGradeCategory> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item?.name}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Maximum Gross Pay",
      dataIndex: "max",
      key: "max",
      render: (_, item) => item.minGrossPay,
    },
    {
      title: "Minimum Gross pay",
      dataIndex: "min",
      key: "min",
      render: (_, item) => item.maxGrossPay,
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

export default PayGradeCategoriesTable;
