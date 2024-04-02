import { Table } from "antd";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import { usePagination } from "hooks/usePagination";

import { THoliday, THolidayAction } from "../types";

import { useGetHolidays } from "../hooks/useGetHolidays";
import { EditHoliday } from "./EditHoliday";
import { DeleteHoliday } from "./DeleteHoliday";
import { HOLIDAY_TABLE_COLUMNS } from "./columns";
import { TableFocusTypeBtn } from "components/table";

export const HolidaysTable: React.FC = () => {
  const [showM, setShowM] = useState<THolidayAction>();
  const [holiday, setHoliday] = useState<THoliday>();
  const handleAction = (data: THoliday, action: THolidayAction) => {
    setShowM(action);
    setHoliday(data);
  };

  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetHolidays({
    pagination,
  });

  const columns: ColumnsType<THoliday> = HOLIDAY_TABLE_COLUMNS(handleAction);
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<THoliday>>(columns);
  return (
    <div className="space-y-4">
      {holiday && (
        <EditHoliday
          open={showM === "edit"}
          holiday={holiday}
          handleClose={() => setShowM(undefined)}
        />
      )}
      <DeleteHoliday
        open={showM === "delete"}
        holiday={holiday}
        handleClose={() => setShowM(undefined)}
      />
      <div className="flex justify-end">
        {TableFocusTypeBtn<THoliday>({
          selectedColumns,
          setSelectedColumns,
          data: {
            columns,
          },
        })}
      </div>
      <Table
        columns={selectedColumns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
