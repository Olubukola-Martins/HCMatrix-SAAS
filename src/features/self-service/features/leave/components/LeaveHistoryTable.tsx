import { Select, Space, Dropdown, Menu, Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";

const LeaveHistoryTable = ({ data = [] }) => {
  const columns: any[] = [
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },

    {
      title: "Leave Length",
      dataIndex: "leaveLength",
      key: "leaveLength",
    },
    {
      title: "With Pay",
      dataIndex: "withPay",

      key: "withPay",
      render: (val: any) => <span>{val ? "Yes" : "No"}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val: any) => (
        <span
          className="capitalize"
          style={{ color: getAppropriateColorForStatus(val) }}
        >
          {val}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (val: any, item: any) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="3">View</Menu.Item>
                <Menu.Item key="2">Approve</Menu.Item>
                <Menu.Item key="1">Reject</Menu.Item>
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
    <div>
      <p className="text-lg mb-4">Leave History</p>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Select size="middle" className="w-32" placeholder="Year">
            <Select.Option value="2020" key="2020">
              2020
            </Select.Option>
          </Select>
          <div className="flex items-center gap-4">
            <i className="ri-download-2-line text-xl"></i>
            <i className="ri-logout-box-r-line text-xl"></i>
          </div>
        </div>
        <Table
          dataSource={data}
          columns={columns}
          // rowSelection={{
          //   type: "checkbox",
          //   rowSelection: () => {},
          // }}
          scroll={{ x: "max-content" }}
          // scroll={{ x: 500 }}
        />
      </div>
    </div>
  );
};

export default LeaveHistoryTable;
