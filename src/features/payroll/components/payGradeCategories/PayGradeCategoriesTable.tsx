import { Button } from "antd";
import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { usePagination } from "hooks/usePagination";
import { TableWithFocusType } from "components/table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { TPayGradeCategory } from "features/payroll/types";
import { useGetPayGradeCategories } from "features/payroll/hooks/payGrades/category/useGetPayGradeCategories";
import moment from "moment";
import DeletePayGradeCategory from "./DeletePayGradeCategory";
import EditPayGradeCategory from "./EditPayGradeCategory";

type TAction = "edit" | "delete";

const PayGradeCategoriesTable: React.FC = () => {
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
      title: "Minimum Gross pay",
      dataIndex: "Minimum Gross pay",
      key: "Minimum Gross pay",
      render: (_, item) => item.minGrossPay,
    },
    {
      title: "Maximum Gross Pay",
      dataIndex: "Maximum Gross Pay",
      key: "Maximum Gross Pay",
      render: (_, item) => item.maxGrossPay,
    },

    {
      title: "Created At",
      dataIndex: "Created At",
      key: "Created At",
      render: (_, item) => moment(item.createdAt).format(`YYYY-MM-DD`),
    },
    {
      title: "Updated At",
      dataIndex: "Updated At",
      key: "Updated At",
      render: (_, item) => moment(item.updatedAt).format(`YYYY-MM-DD`),
    },

    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, item) => (
        <div>
          <Button
            icon={<AiFillEdit />}
            type="text"
            onClick={() => handleAction({ action: "edit", category: item })}
          />
          <Button
            icon={<AiFillDelete />}
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
        <EditPayGradeCategory
          category={category}
          open={action === "edit"}
          handleClose={() => cancelAction()}
        />
      )}
      {category && (
        <DeletePayGradeCategory
          category={category}
          open={action === "delete"}
          handleClose={() => cancelAction()}
        />
      )}
      <TableWithFocusType
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

export default PayGradeCategoriesTable;
