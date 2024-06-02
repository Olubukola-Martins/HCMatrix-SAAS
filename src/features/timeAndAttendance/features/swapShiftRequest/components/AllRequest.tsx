import React from "react";
import { allSwapRequestProps } from "../types";
import { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu, Select } from "antd";
import { TableWithFocusType } from "components/table";

export const AllRequest = () => {
  const columns: ColumnsType<allSwapRequestProps> = [
    {
      title: "Date",
      key: "date",
    },
    {
      title: "Name",
      key: "employee",
    },
    {
      title: "Department",
      key: "department",
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
                <Menu.Item key="3">Reject</Menu.Item>
                <Menu.Item key="4">Approve</Menu.Item>
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
        ]}
        className="w-[7.8rem]"
        placeholder="Status"
        allowClear
      />
      <TableWithFocusType columns={columns} dataSource={[]} />
    </div>
  );
};
