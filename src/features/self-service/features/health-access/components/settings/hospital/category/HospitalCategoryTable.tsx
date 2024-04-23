import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { Table } from "antd";
import { useGetHospitalCategories } from "features/self-service/features/health-access/hooks/hospital/category/useGetHospitalCategories";
import { THospitalCategory } from "features/self-service/features/health-access/types/hospital/category";
import { ViewHospitalCategory } from "./ViewHospitalCategory";
import { EditHospitalCategory } from "./EditHospitalCategory";
import { DeleteHospitalCategory } from "./DeleteHospitalCategory";
import { HOSPITAL_CATEGORY_TABLE_COLUMNS } from "../../../columns/hospital-category";
import { TableFocusTypeBtn } from "components/table";

export type THospitalCategoryAction = "edit" | "view" | "delete";
export const HospitalCategoryTable: React.FC<{
  search?: string;
}> = ({ search }) => {
  const [category, setCategory] = useState<THospitalCategory>();
  const [action, setAction] = useState<THospitalCategoryAction>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetHospitalCategories({
    pagination,
    searchParams: { name: search },
  });
  const handleAction = (
    action: THospitalCategoryAction,
    category: THospitalCategory
  ) => {
    setAction(action);
    setCategory(category);
  };

  const columns: ColumnsType<THospitalCategory> =
    HOSPITAL_CATEGORY_TABLE_COLUMNS(handleAction);

  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<THospitalCategory>>(columns);
  return (
    <div className="space-y-6">
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
      <div className="flex justify-end">
        {TableFocusTypeBtn<THospitalCategory>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <Table
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        columns={selectedColumns}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
