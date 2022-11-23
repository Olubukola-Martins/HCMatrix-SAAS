import React from "react";
import { motion } from "framer-motion";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string;
  employeeNumber: number;
  departmentMail: string;
  departmentHead: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Department Name",
    dataIndex: "name",
  },
  {
    title: "Number of Employees",
    dataIndex: "employeeNumber",
  },
  {
    title: "Department Mail",
    dataIndex: "departmentMail",
  },
  {
    title: "Department Head",
    dataIndex: "departmentHead",
  },
  {
    title: "action",
    dataIndex: "action",
    render: (text: string) => (
      <div className="flex items-center gap-3 text-base">
        <Link to="/settings/departments/1">
          <i className="ri-eye-line cursor-pointer"></i>
        </Link>
        <Link to="/settings/departments/1">
          <i className="ri-pencil-fill cursor-pointer"></i>
        </Link>
        <i className="ri-delete-bin-line cursor-pointer"></i>
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Sales Department",
    employeeNumber: 32,
    departmentMail: "sales@snapnetsolutions.com",
    departmentHead: "Basil Ikpe",
  },
  {
    key: "2",
    name: "Dev Team",
    employeeNumber: 42,
    departmentMail: "dev@snapnetsolutions.com",
    departmentHead: "Basil Ikpe",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

export const DepartmentsTableView = () => {
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
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        className="mt-5"
      />
    </motion.div>
  );
};
