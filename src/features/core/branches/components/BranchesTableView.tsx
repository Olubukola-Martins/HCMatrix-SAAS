import React, { useState } from "react";
import { motion } from "framer-motion";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TBranch } from "../types";
import { BRANCHES_TABLE_COLUMNS } from "./columns";
import { TableFocusTypeBtn } from "components/table";

interface IProps {
  data?: TBranch[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TBranch>["onChange"];
  editBranch: (val: TBranch) => void;
  viewBranch: (val: TBranch) => void;
  deleteBranch: (val: TBranch) => void;
}

export const BranchesTableView = ({
  data,
  loading,
  pagination,
  onChange,
  editBranch,
  viewBranch,
  deleteBranch,
}: IProps) => {
  const columns: ColumnsType<TBranch> = BRANCHES_TABLE_COLUMNS(
    editBranch,
    viewBranch,
    deleteBranch
  );
  const [selectedColumns, setSelectedColumns] =
    useState<ColumnsType<TBranch>>(columns);
  return (
    <motion.div
      className="mt-4 space-y-6"
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
        {TableFocusTypeBtn<TBranch>({
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
        dataSource={data?.map((item) => ({ key: item.id, ...item }))}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </motion.div>
  );
};
