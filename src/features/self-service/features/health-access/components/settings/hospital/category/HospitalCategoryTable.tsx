import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Button, Dropdown, Menu, Table } from "antd";
import { useGetHospitalCategories } from "features/self-service/features/health-access/hooks/hospital/category/useGetHospitalCategories";
import { THospitalCategory } from "features/self-service/features/health-access/types/hospital/category";
import { ViewHospitalCategory } from "./ViewHospitalCategory";
import { EditHospitalCategory } from "./EditHospitalCategory";
import { DeleteHospitalCategory } from "./DeleteHospitalCategory";

type TAction = "edit" | "view" | "delete";
export const HospitalCategoryTable: React.FC<{
  search?: string;
}> = ({ search }) => {
  const [category, setCategory] = useState<THospitalCategory>();
  const [action, setAction] = useState<TAction>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetHospitalCategories({
    pagination,
    searchParams: { name: search },
  });
  const handleAction = (action: TAction, category: THospitalCategory) => {
    setAction(action);
    setCategory(category);
  };

  const columns: ColumnsType<THospitalCategory> = [
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
      render: (_, item) => <span>{item.name} </span>,
    },

    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      ellipsis: true,
      render: (_, item) => (
        <span className="capitalize">{item.description} </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view" onClick={() => handleAction("view", item)}>
                View Details
              </Menu.Item>
              <Menu.Item key="edit" onClick={() => handleAction("edit", item)}>
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                onClick={() => handleAction("delete", item)}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button title="Actions" icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <ViewHospitalCategory
        handleClose={() => setAction(undefined)}
        hospitalCategory={category}
        open={action === "view"}
      />
      <EditHospitalCategory
        handleClose={() => setAction(undefined)}
        hospitalCategory={category}
        open={action === "edit"}
      />
      <DeleteHospitalCategory
        handleClose={() => setAction(undefined)}
        category={category}
        open={action === "delete"}
      />
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={columns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
