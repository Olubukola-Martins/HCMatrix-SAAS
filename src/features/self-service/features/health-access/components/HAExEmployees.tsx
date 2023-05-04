import { Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const HAExEmployees = ({ data = [] }) => {
  const fdata = [
    { name: "Ruth", email: "red@gmail.com" },
    { name: "Jim", email: "gro@gmail.com" },
    { name: "Kim", email: "gro@gmail.com" },
  ];
  const columns: any[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // ellipsis: true,

      // width: 100,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Health Plan",
      dataIndex: "healthPlan",
      key: "healthPlan",
      render: () => <span className="text-green-600">Add to plan</span>,
    },
    {
      title: "No of Dependents",
      dataIndex: "depCount",
      key: "depCount",
      render: () => <span>0</span>,
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: () => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="3">View</Menu.Item>
                <Menu.Item key="2">Edit</Menu.Item>
                <Menu.Item key="1">Delete</Menu.Item>
              </Menu>
            }
            trigger={["click", "hover"]}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex justify-end items-center">
        <div className="flex items-center gap-4">
          <i className="ri-download-2-line text-xl"></i>
          <i className="ri-logout-box-r-line text-xl"></i>
        </div>
      </div>
      <Table
        dataSource={fdata}
        columns={columns}
        // rowSelection={{
        //   type: "checkbox",
        //   rowSelection: () => {},
        // }}
        scroll={{ x: "max-content" }}
        // scroll={{ x: 500 }}
      />
    </div>
  );
};

export default HAExEmployees;
