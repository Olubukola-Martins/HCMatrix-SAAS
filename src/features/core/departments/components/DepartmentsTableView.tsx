import { Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TDepartment } from "../types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

interface IProps {
  departments: TDepartment[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TDepartment>["onChange"];
  editDepartment: (val: number) => void;
}

export const DepartmentsTableView = ({
  departments,
  loading,
  pagination,
  onChange,
  editDepartment,
}: IProps) => {
  const columns: ColumnsType<TDepartment> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department Head",
      dataIndex: "departmentHeadId",
      key: "departmentHeadId",
      render: (_, item) => (
        <span className="capitalize">
          {item?.departmentHead
            ? getEmployeeFullName(item?.departmentHead)
            : ""}
        </span>
      ),
    },
    {
      title: "Parent Department",
      dataIndex: "parentDepartmentId",
      key: "parentDepartmentId",
      render: (_, item) => (
        <span className="capitalize">
          {item?.parentDepartment ? item.parentDepartment.name : ""}
        </span>
      ),
    },
    {
      title: "Employee Count",
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
            onClick={() => editDepartment(item.id)}
          ></i>
          <i className="ri-delete-bin-line cursor-pointer hover:text-caramel"></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="small"
        dataSource={departments}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};
