import { Select, Space, Dropdown, Menu, Table, Drawer, Button } from "antd";
import { MoreOutlined, CloseOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import ViewLeaveRequest from "./ViewLeaveRequest";
import Themes from "components/Themes";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";

const LeaveRequestsTable = ({ data = [] }) => {
  const [requestId, setRequestId] = useState("");
  const [showD, setShowD] = useState(false);
  const handleView = ({ id }: any) => {
    setRequestId(id);
    setShowD(true);
  };

  const columns: any[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val: any) => <span>{`Gloria Gbenga`}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (val: any) => <span>{`Marketing`}</span>,

      // ellipsis: true,

      // width: 100,
    },
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
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
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
                <Menu.Item key="3" onClick={() => handleView({ id: item.id })}>
                  View
                </Menu.Item>
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
      <Drawer
        visible={showD}
        onClose={() => setShowD(false)}
        // className={`${isDark ? "custom-draw-dark" : ""}`}
        // mask={false}
        closeIcon={false}
        title={
          <Themes>
            <div className="px-4 py-4 flex justify-between items-center">
              <span className="text-accent">{`Leave Details`}</span>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setShowD(false)}
              />
            </div>
          </Themes>
        }
        // zIndex={10}
        // contentWrapperStyle={{ top: 220, right: 70 }}
        // contentWrapperStyle={{ background: "purple" }}
        // getContainer={() => containerRef.current}
      >
        <Themes>
          <div className="p-4">{<ViewLeaveRequest id={requestId} />}</div>
        </Themes>
      </Drawer>
      <p className="text-lg mb-4">Leave Requests</p>
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

export default LeaveRequestsTable;
