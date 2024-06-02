import { ColumnsType } from "antd/lib/table";
import { allSwapRequestProps } from "../types";
import { TableWithFocusType } from "components/table";
import { Dropdown, Menu, Select } from "antd";

export const MyRequest = () => {
  const columns: ColumnsType<allSwapRequestProps> = [
    {
      title: "Date",
      key: "date",
    },
    {
      title: "Default Shift",
      key: "defaultShift",
    },
    {
      title: "New Shift",
      key: "newShift",
    },
    {
      title: "Swap partner",
      key: "swapPartner",
    },
    {
      title: "Status",
      key: "status",
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
                <Menu.Item key="1">Edit</Menu.Item>
                <Menu.Item key="2">Delete</Menu.Item>
                <Menu.Item key="5">Cancel</Menu.Item>
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
    <div className="mt-5">
      <Select
        options={[
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
          { value: "canceled", label: "Canceled" },
        ]}
        className="w-[7.8rem]"
        placeholder="Status"
        allowClear
      />
      <TableWithFocusType columns={columns} dataSource={[]} />
    </div>
  );
};
