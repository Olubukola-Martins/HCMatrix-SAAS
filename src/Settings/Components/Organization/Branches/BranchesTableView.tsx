import React from "react";
import { motion } from "framer-motion";
import { TBranch } from "../../../../AppTypes/DataEntitities";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";

interface IProps {
  data: TBranch[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TBranch>["onChange"];
  editBranch: (val: number) => void;
  viewBranch: (val: number) => void;
}

export const BranchesTableView = ({
  data,
  loading,
  pagination,
  onChange,
  editBranch,
  viewBranch,
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
            onClick={() => editBranch(item.id)}
          ></i>
          <i
            className="ri-eye-line cursor-pointer hover:text-caramel"
            onClick={() => viewBranch(item.id)}
          ></i>
          <i className="ri-delete-bin-line cursor-pointer hover:text-caramel"></i>
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
