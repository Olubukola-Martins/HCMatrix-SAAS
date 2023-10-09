import React from "react";
import { motion } from "framer-motion";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TBranch } from "../types";

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
  const columns: ColumnsType<TBranch> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EmployeeCount",
      dataIndex: "employeeCount",
      key: "employeeCount",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      render: (_, item) => `${item.address.streetAddress}`,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, item) => (
        <div className="flex items-center gap-3 text-lg">
          <i
            className="ri-pencil-line cursor-pointer hover:text-caramel"
            onClick={() => editBranch(item)}
          ></i>
          <i
            className="ri-eye-line cursor-pointer hover:text-caramel"
            onClick={() => viewBranch(item)}
          ></i>
          <i
            className="ri-delete-bin-line cursor-pointer hover:text-caramel"
            onClick={() => deleteBranch(item)}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <motion.div
      className="mt-4"
      initial={{ opacity: 0, y: 400 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      key={2}
      transition={{ ease: "easeIn" }}
      exit={{ opacity: 0, y: 400 }}
    >
      <Table
        columns={columns}
        size="small"
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </motion.div>
  );
};
