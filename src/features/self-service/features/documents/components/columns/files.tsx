import { Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TFileListItem, TFolderListItem } from "../../types";
import { IViewFilesActions } from "../../types/fileList";

export const FILE_TABLE_COLUMNS = (
  action: IViewFilesActions
): ColumnsType<TFileListItem> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // width: 200,
    // ellipsis: true,

    render: (_, item) => <span className="capitalize">{item.name}</span>,
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    render: (_, item) => <span className="capitalize">{item.description}</span>,
    // ellipsis: true,
  },

  {
    title: "Date Added",
    key: "name",
    // width: 200,
    // ellipsis: true,
    render: (_, item) => <span className="capitalize">{item.name}</span>,
  },

  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
    // width: 100,

    render: (_, file) => (
      <Dropdown
        overlay={
          <Menu
            mode="vertical"
            items={[
              {
                label: "Edit File",
                key: "Edit",
                disabled: action.fromFolderView ? false : true,
              },
              {
                label: "Assign File",
                key: "Assign",
                disabled: action.fromFolderView ? false : true,
                onClick: () =>
                  action.handleAssignFile &&
                  action.handleAssignFile(file as unknown as TFileListItem),
              },
              {
                label: "Delete File",
                key: "Delete",
                disabled: action.fromFolderView ? false : true,
                onClick: () =>
                  action.handleDelete &&
                  action.handleDelete(file as unknown as TFileListItem),
              },
              {
                label: (
                  <a href={file.url} rel="noreferrer">
                    <span>Download</span>
                  </a>
                ),
                key: "Download",
              },
            ]}
          />
        }
        children={<i className="ri-more-2-fill text-lg cursor-pointer"></i>}
        trigger={["click"]}
      />
    ),
  },
];
