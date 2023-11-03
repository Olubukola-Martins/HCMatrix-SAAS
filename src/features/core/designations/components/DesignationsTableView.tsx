import React from "react";
import { motion } from "framer-motion";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TDesignation } from "../types";

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
  const columns: ColumnsType<TDesignation> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (val) => val.name,
    },

    {
      title: "Emloyee Count",
      dataIndex: "employeeCount",
      key: "employeeCount",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, item) => (
        <div className="flex items-center gap-3 text-lg">
          <i
            className="ri-pencil-line cursor-pointer hover:text-caramel"
            onClick={() => editDesignation(item)}
          ></i>
          <i
            className="ri-eye-line cursor-pointer hover:text-caramel"
            onClick={() => viewDesignation(item)}
          ></i>
          <i
            className="ri-delete-bin-line cursor-pointer hover:text-caramel"
            onClick={() => deleteDesignation(item)}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <motion.div
      className="  mt-4"
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
