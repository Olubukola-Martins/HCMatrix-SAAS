import { Menu, Space, Select, Table, Typography, Dropdown } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

// INTERFACE/TYPES
type DataSourceItem = {
  key: React.Key;
  userName: string;
  email: string;
  createdOn: string;
};

export const RecruitmentUsers = () => {
  // FUNCTION TO HANDLE DROPDOWN CHANGES
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  // COLUMS OF TABLE
  const columns: ColumnsType<DataSourceItem> = [
    {
      key: "1",
      title: "User Name",
      dataIndex: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
    },
    {
      title: "Created on",
      dataIndex: "createdOn",
      key: "3",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, val) => (
        <div>
          <Dropdown
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">View User</Menu.Item>
                <Menu.Item key="2">Delete User</Menu.Item>
              </Menu>
            }
          >
            <i className="ri-more-2-fill text-lg cursor-pointer"></i>
          </Dropdown>
        </div>
      ),
    },
  ];

  // DATASOURCE FOR TABLE
  const dataSource: DataSourceItem[] = [];
  for (let i = 0; i < 8; i++) {
    dataSource.push({
      key: i,
      userName: "Adeyemi Samuel",
      email: "Adeyemi.samuel@gmail..com",
      createdOn: "27/05/2023",
    });
  }

  return (
    <>
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 600 }} />
    </>
  );
};
