import React, { useState } from "react";
import { motion } from "framer-motion";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TDesignation } from "../types";
import { DESIGNATION_TABLE_COLUMNS } from "./columns";
import { TableFocusTypeBtn } from "components/table";

interface IProps {
  onChange?: TableProps<TDesignation>["onChange"];
  data?: TDesignation[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  editDesignation: (val: TDesignation) => void;
  viewDesignation: (val: TDesignation) => void;
  deleteDesignation: (val: TDesignation) => void;
}

export const DesignationsTableView = ({
  data,
  loading,
  pagination,
  onChange,
  editDesignation,
  deleteDesignation,
  viewDesignation,
}: IProps) => {
  const columns: ColumnsType<TDesignation> = DESIGNATION_TABLE_COLUMNS(
    editDesignation,
    viewDesignation,
    deleteDesignation
  );
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TDesignation>>(columns);

  return (
    <motion.div
      className="  mt-4 space-y-4"
      initial={{ opacity: 0, y: 400 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      key={2}
      transition={{ ease: "easeIn" }}
      exit={{ opacity: 0, y: 400 }}
    >
      <div className="flex justify-end">
        {TableFocusTypeBtn<TDesignation>({
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
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </motion.div>
  );
};
