import { ColumnsType } from "antd/lib/table";
import { TDepartment } from "../../types";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";

export const DEPARTMENT_TABLE_COLUMNS = (
  editDepartment: (val: TDepartment) => void,
  viewDepartment: (val: TDepartment) => void,
  deleteDepartment: (val: TDepartment) => void
): ColumnsType<TDepartment> => [
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
        {item?.departmentHead ? getEmployeeFullName(item?.departmentHead) : ""}
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
    key: "action",
    render: (_, item) => (
      <div className="flex items-center gap-3 text-lg">
        <i
          className="ri-pencil-line cursor-pointer hover:text-caramel"
          onClick={() => editDepartment(item)}
        ></i>
        <i
          className="ri-eye-line cursor-pointer hover:text-caramel"
          onClick={() => viewDepartment(item)}
        ></i>
        <i
          className="ri-delete-bin-line cursor-pointer hover:text-caramel"
          onClick={() => deleteDepartment(item)}
        ></i>
      </div>
    ),
  },
];
export const DEPARTMENT_EXPORT_COLUMNS = (
  items?: TDepartment[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      Name: item.name,

      "Department Email": item.email,

      "Department Head": item?.departmentHead
        ? getEmployeeFullName(item?.departmentHead)
        : "N/A",
      "Parent Department": item?.parentDepartment
        ? item.parentDepartment.name
        : "",
      "Employee Count": item.employeeCount,
    })) ?? []
  );
};
