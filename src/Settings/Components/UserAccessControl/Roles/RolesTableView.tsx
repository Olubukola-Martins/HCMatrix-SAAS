import React from "react";
import { motion } from "framer-motion";
import { TDepartment, TRole } from "../../../../AppTypes/DataEntitities";
import { PaginationProps, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";

interface IProps {
  data: TRole[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TRole>["onChange"];
}

export const RolesTableView = ({
  data,
  loading,
  pagination,
  onChange,
}: IProps) => {
  const columns: ColumnsType<TRole> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "User Count",
      dataIndex: "userCount",
      key: "userCount",
    },
    {
      title: "Action",
      key: "action",
      width: 70,
      fixed: "right",
      render: (val, item) => (
        <Space align="center" size={"small"}>
          <i className="ri-pencil-fill cursor-pointer hover:text-caramel"></i>{" "}
          <i className="ri-delete-bin-line pl-2 cursor-pointer hover:text-caramel"></i>
        </Space>
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
