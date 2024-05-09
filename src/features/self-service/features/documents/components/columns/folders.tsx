import { Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";
import { AiOutlineMore } from "react-icons/ai";
import { TFolderListItem } from "../../types";
import { TFolderAction } from "../FoldersTable";

export const FOLDER_TABLE_COLUMNS = (
  setFolder: (folder?: TFolderListItem) => void,
  setAction: (action?: TFolderAction) => void
): ColumnsType<TFolderListItem> => [
  {
    title: "Folder Name",
    dataIndex: "name",
    key: "name",
    render: (val, item) => <span className="capitalize">{item.name}</span>,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (val, item) => (
      <span className="capitalize text-caramel hover:underline">
        {moment(item.createdAt).format(DEFAULT_DATE_FORMAT)}
      </span>
    ),
  },
  {
    title: "Last Modified",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (val, item) => (
      <span className="capitalize text-caramel hover:underline">
        {moment(item.updatedAt).format(DEFAULT_DATE_FORMAT)}
      </span>
    ),
  },

  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
    render: (_, item) => (
      <Dropdown
        overlay={
          <Menu
            items={[
              {
                label: "Edit",
                key: "Edit",
                onClick: () => {
                  setFolder(item);
                  setAction("edit");
                },
              },
              {
                label: "Delete",
                key: "Delete",
                onClick: () => {
                  setFolder(item);
                  setAction("delete");
                },
              },
            ]}
          />
        }
        children={<AiOutlineMore />}
        trigger={["click"]}
      />
    ),
  },
];
