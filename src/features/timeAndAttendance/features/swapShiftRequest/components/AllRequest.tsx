import React from "react";
import { PostMySwapShiftRequestProps } from "../types";
import { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu, Select } from "antd";
import { TableWithFocusType } from "components/table";
import { useGetGeneralRequest } from "../hooks/useGetGeneralRequest";
import { usePagination } from "hooks/usePagination";

export const AllRequest = () => {
  const { data, isLoading } = useGetGeneralRequest();
  const { pagination, onChange } = usePagination({ pageSize: 10 });
  const columns: ColumnsType<PostMySwapShiftRequestProps> = [
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
      <TableWithFocusType
        className="mt-3"
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};
