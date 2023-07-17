import { Button, Table } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { TPayGrade } from "features/payroll/types";
import { useGetPayGrades } from "features/payroll/hooks/payGrades/useGetPayGrades";
import moment from "moment";

import { DeleteFilled, EditFilled } from "@ant-design/icons";
import EditPensionAdmin from "./EditPensionAdmin";
import DeletePensionAdmin from "./DeletePensionAdmin";

type TAction = "edit" | "delete";

const PensionAdminTable: React.FC<{
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => <span className="capitalize">{item?.name}</span>,

      // ellipsis: true,

      // width: 100,
    },

    {
      title: "Employee Count",
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
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <div>
          <Button
            icon={<EditFilled />}
            type="text"
            onClick={() => handleAction({ action: "edit", grade: item })}
          />
          <Button
            icon={<DeleteFilled />}
            type="text"
            onClick={() => handleAction({ action: "delete", grade: item })}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {grade && (
        <EditPensionAdmin
          grade={grade}
          open={action === "edit"}
          handleClose={() => cancelAction()}
        />
      )}
      {grade && (
        <DeletePensionAdmin
          grade={grade}
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

export default PensionAdminTable;
