import { ColumnsType } from "antd/lib/table";
import { TDesignation } from "../../types";

export const DESIGNATION_TABLE_COLUMNS = (
  editDesignation: (val: TDesignation) => void,
  viewDesignation: (val: TDesignation) => void,
  deleteDesignation: (val: TDesignation) => void
): ColumnsType<TDesignation> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    render: (_, val) => val.department.name,
  },

  {
    title: "Emloyee Count",
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
export const DESIGNATION_EXPORT_COLUMNS = (
  items?: TDesignation[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      Name: item.name,

      Department: item.department.name,
      "Emloyee Count": item.employeeCount,
    })) ?? []
  );
};
