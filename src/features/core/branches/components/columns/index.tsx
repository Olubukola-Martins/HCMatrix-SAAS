import { ColumnsType } from "antd/lib/table";
import { TBranch } from "../../types";

export const BRANCHES_TABLE_COLUMNS = (
  editBranch: (val: TBranch) => void,
  viewBranch: (val: TBranch) => void,
  deleteBranch: (val: TBranch) => void
): ColumnsType<TBranch> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Employee Count",
    dataIndex: "employeeCount",
    key: "employeeCount",
  },
  {
    title: "Child Branches' Count",
    dataIndex: "childBranchesCount",
    key: "childBranchesCount",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    ellipsis: true,
    render: (_, item) => `${item.address?.streetAddress}`,
  },

  {
    title: "Action",
    dataIndex: "action",
    key: "action",
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
export const BRANCHES_EXPORT_COLUMNS = (
  items?: TBranch[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      Name: item.name,
      Address: item.address?.streetAddress,
      "Emloyee Count": item.employeeCount,
    })) ?? []
  );
};
