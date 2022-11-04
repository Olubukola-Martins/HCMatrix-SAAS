import { Select, Space, Dropdown, Menu, Table, Drawer, Button } from "antd";
import { MoreOutlined, CloseOutlined } from "@ant-design/icons";
import Themes from "../../../Themes/Themes";

import React, { useEffect, useState } from "react";
import { leaveRequestStatusColor } from "../../UtilityHelpers/leaves";
import CRBBookingDetails from "./CRBBookingDetails";

interface ICRBRequestEntry {
  roomName: string;
  createdOn: string;
  reason: string;
  startTime: string;
  endTime: string;
  status: "approved" | "rejected" | "pending";
  meetingDate: string;
  department: string;
  id: string;
  key: string;
}

const data: ICRBRequestEntry[] = [
  {
    roomName: "Red Room",
    createdOn: "02/30/2021",
    reason: "We need to discuss",
    startTime: "8:00 am",
    endTime: "9:00 am",
    status: "pending",
    meetingDate: "09/07/2023",
    department: "IT",
    id: "er",
    key: "er",
  },
  {
    roomName: "Apple Room",
    createdOn: "02/30/2021",
    reason: "We need to discuss",
    startTime: "8:00 am",
    endTime: "9:00 am",
    status: "approved",
    meetingDate: "09/07/2023",
    department: "IT",
    id: "re",
    key: "re",
  },
];

const CRBHistoryTable = () => {
  const [requestId, setRequestId] = useState("");
  const [showD, setShowD] = useState(false);
  const handleView = ({ id }: { id: string }) => {
    setRequestId(id);
    setShowD(true);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdOn",
      key: "createdOn",

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
      render: (val: string) => <span>{`Marketing`}</span>,

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,

      // width: 100,
    },

    {
      title: "Meeting Date",
      dataIndex: "meetingDate",
      key: "meetingDate",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },

    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },

    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val: string) => (
        <span
          className="capitalize"
          style={{ color: leaveRequestStatusColor(val) }}
        >
          {val}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      render: (val: string, item: any) => (
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
        closeIcon={false}
        title={"View Request"}
      >
        <CRBBookingDetails id={requestId} />
      </Drawer>
      <p className="text-lg mb-4">Booking History</p>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Select size="middle" className="w-32" placeholder="Filter">
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
          rowSelection={{
            type: "checkbox",
          }}
          scroll={{ x: "max-content" }}
          // scroll={{ x: 500 }}
        />
      </div>
    </div>
  );
};

export default CRBHistoryTable;
