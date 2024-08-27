import { Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TAssignedFiles, } from "../../types";

export const FILE_TABLE_COLUMNS =
  (): // handleView: (props: { file: TFileListItem }) => void,
  // handleEdit: (props: { file: TFileListItem }) => void,
  // handleDelete: (props: { file: TFileListItem }) => void
  ColumnsType<TAssignedFiles> => [
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
      render: (_, item) => (
        <span className="capitalize">{item.description}</span>
      ),
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
              items={[
                {
                  label: (
                    <a href={file.url} rel="noreferrer">
                      <span className="text-caramel cursor-pointer">
                        Download
                      </span>
                    </a>
                  ),
                  key: "Download",
                },
                // {
                //   label: "View",
                //   key: "View",
                //   onClick: () => handleView({ file }),
                // },
                // {
                //   label: "Edit",
                //   key: "Edit",
                //   onClick: () => handleEdit({ file }),
                // },
                // {
                //   label: "Delete",
                //   key: "Delete",
                //   onClick: () => handleDelete({ file }),
                // },
              ]}
            />
          }
          children={<i className="ri-more-2-fill text-lg cursor-pointer"></i>}
          trigger={["click"]}
        />
      ),
    },
  ];
