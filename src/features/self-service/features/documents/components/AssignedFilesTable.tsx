import { ColumnsType } from "antd/lib/table";
import { TableWithFocusType } from "components/table";
import { TAssignedFiles } from "../types";
import { Dropdown, Menu } from "antd";

export const AssignedFilesTable = () => {
  const columns: ColumnsType<TAssignedFiles> = [
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date Added",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">Download File</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  return (
    <div>
      <TableWithFocusType
        className="mt-3"
        columns={columns}
        dataSource={[]}
        // loading={isLoading}
        // pagination={{ ...pagination, total: data?.total }}
        // onChange={onChange}
      />
    </div>
  );
};
