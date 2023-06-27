import { Table } from "antd";

import React from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { TPayGrade } from "features/payroll/types";

const PayGradesTable: React.FC<{
  categoryId?: number;
}> = ({ categoryId }) => {
  const { pagination, onChange } = usePagination();

  //   const { data, isFetching } = useGetAssets({
  //     pagination,
  //     companyId,
  //     token,
  //     status,
  //     typeId,
  //   });

  const columns: ColumnsType<TPayGrade> = [
    {
      title: "Level",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span className="capitalize text-caramel hover:underline">
          {item?.name}
        </span>
      ),

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Category",
      dataIndex: "uid",
      key: "uid",
      render: (_, item) => item.uid,
    },
    {
      title: "Gross pay",
      dataIndex: "uid",
      key: "uid",
      render: (_, item) => item.uid,
    },
    {
      title: "Created At",
      dataIndex: "uid",
      key: "uid",
      render: (_, item) => item.uid,
    },
    {
      title: "Updated At",
      dataIndex: "uid",
      key: "uid",
      render: (_, item) => item.uid,
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={[]}
        // loading={isFetching}
        // pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default PayGradesTable;
