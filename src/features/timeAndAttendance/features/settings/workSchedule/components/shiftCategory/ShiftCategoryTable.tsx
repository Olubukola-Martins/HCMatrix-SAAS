import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { usePagination } from "hooks/usePagination";
import { TableWithFocusType } from "components/table";
import { TWorkSheduleShiftCategory } from "../../types";
import { useGetWorkSheduleShiftCategories } from "../../hooks/shift/categories/useGetWorkSheduleShiftCategories";
import { WORK_SCHEDULE_SHIFT_CATEGORY_TABLE_COLUMNS } from "./columns";
import { EditShiftCategory } from "./EditShiftCategory";
import { ToggleShiftCategory } from "./ToggleShiftCategory";
import { DeleteShiftCategory } from "./DeleteShiftCategory";

export type TWorkSheduleShiftCategoryAction = "toggle" | "delete" | "edit";
export const ShiftCategoryTable: React.FC = () => {
  const [category, setCategory] = useState<TWorkSheduleShiftCategory>();
  const [action, setAction] = useState<TWorkSheduleShiftCategoryAction>();
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetWorkSheduleShiftCategories({
    props: {
      pagination,
      
    },
  });
  const handleAction = (
    action: TWorkSheduleShiftCategoryAction,
    category: TWorkSheduleShiftCategory
  ) => {
    setAction(action);
    setCategory(category);
  };

  const columns: ColumnsType<TWorkSheduleShiftCategory> =
    WORK_SCHEDULE_SHIFT_CATEGORY_TABLE_COLUMNS(handleAction);

  return (
    <div className="space-y-6">
      <DeleteShiftCategory
        handleClose={() => setAction(undefined)}
        category={category}
        open={action === "delete"}
      />
      <EditShiftCategory
        handleClose={() => setAction(undefined)}
        category={category}
        open={action === "edit"}
      />
      {category && (
        <ToggleShiftCategory
          handleClose={() => setAction(undefined)}
          data={category}
          open={action === "toggle"}
        />
      )}

      <TableWithFocusType
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
