import React from "react";
import { motion } from "framer-motion";
import { TDepartment, TDesignation } from "../../../../AppTypes/DataEntitities";
import { PaginationProps, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";

interface IProps {
  data: TDesignation[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TDesignation>["onChange"];
}

export const DesignationsTableView = ({
  data,
  loading,
  pagination,
  onChange,
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
