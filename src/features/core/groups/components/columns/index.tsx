import { ColumnsType } from "antd/lib/table";
import { TGroup } from "../../types";

export const GROUPS_TABLE_COLUMNS = (
  editGroup: (val: TGroup) => void,
  deleteGroup: (val: TGroup) => void
): ColumnsType<TGroup> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Group Email",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 80,

    render: (_, item) => (
      <div className="flex items-center gap-3 text-lg">
        <i
          className="ri-pencil-line cursor-pointer hover:text-caramel"
          onClick={() => editGroup(item)}
        />
        <i
          className="ri-delete-bin-line cursor-pointer hover:text-caramel"
          onClick={() => deleteGroup(item)}
        />
      </div>
    ),
  },
];
export const GROUPS_EXPORT_COLUMNS = (
  items?: TGroup[]
): Record<string, string | number>[] => {
  return (
    items?.map((item) => ({
      Name: item.name,
      "Group Email": item.email,

      Description: item.description,
    })) ?? []
  );
};
