import { Button, Table } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { TPayGradeCategory } from "features/payroll/types";
import { useGetPayGradeCategories } from "features/payroll/hooks/payGrades/category/useGetPayGradeCategories";
import moment from "moment";
import { DeleteFilled, DownloadOutlined } from "@ant-design/icons";
import DeletePayrollReport from "./DeletePayrollReport";

type TAction = "delete" | "download";

const PayrollReportTable: React.FC = () => {
  const [action, setAction] = useState<TAction>();
  const [category, setCategory] = useState<TPayGradeCategory>();
  const handleAction = ({
    action,
    category,
  }: {
    action: TAction;
    category: TPayGradeCategory;
  }) => {
    setAction(action);
    setCategory(category);
  };
  const cancelAction = () => {
    setAction(undefined);
    setCategory(undefined);
  };

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
      title: "Description",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item?.name}</span>,

      ellipsis: true,
    },
    {
      title: "Template",
      dataIndex: "max",
      key: "max",
      render: (_, item) => <span>Template A</span>,
    },

    {
      title: "From",
      dataIndex: "update",
      key: "update",
      render: (_, item) => moment(item.updatedAt).format(`MMMM DD, YYYY`),
    },
    {
      title: "To",
      dataIndex: "update",
      key: "update",
      render: (_, item) => moment(item.updatedAt).format(`MMMM DD, YYYY`),
    },
    {
      title: "Schemes",
      dataIndex: "schemes",
      key: "schemes",
      render: (_, item) => <span>All</span>,
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
