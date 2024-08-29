import { Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TFileListItem } from "../../types";
import { IViewFilesActions } from "../../types/fileList";

export const FILE_TABLE_COLUMNS = (
  action: IViewFilesActions
): // handleView: (props: { file: TFileListItem }) => void,
// handleEdit: (props: { file: TFileListItem }) => void,
// handleDelete: (props: { file: TFileListItem }) => void
ColumnsType<TFileListItem> => [
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
                label: "View",
                key: "View",
                // hidden: true,
                popupClassName: "hidden",
                // onClick: () => handleView({ file }),
              },
              {
                label: "Edit",
                key: "Edit",
                disabled: action.fromFolderView ? false : true,
                // onClick: () => handleEdit({ file }),
              },
              {
                label: "Delete",
                key: "Delete",
                disabled: action.fromFolderView ? false : true,
                // onClick: () => handleDelete({ file }),
              },
              {
                label: (
                  <a href={file.url} rel="noreferrer">
                    <span>
                      Download
                    </span>
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
