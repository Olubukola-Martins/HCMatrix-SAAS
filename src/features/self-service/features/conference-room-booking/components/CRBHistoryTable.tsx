import { Space, Dropdown, Menu, Table, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { ColumnsType } from "antd/lib/table";

import moment from "moment";
import {
  TCRBookingStatus,
  useFetchAllConferenceRoomBookings,
} from "../hooks/useFetchAllConferenceRoomBookings";
import { TSingleConferenceRoomBooking } from "../types";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import CRBBookingDetails from "./CRBBookingDetails";
import { usePagination } from "hooks/usePagination";

const CRBHistoryTable: React.FC<{
  status?: TCRBookingStatus;
  employeeId?: number;
}> = ({ status, employeeId }) => {
  const [showD, setShowD] = useState(false);
  const [bookingId, setBookingId] = useState<number>();
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useFetchAllConferenceRoomBookings({
    pagination,
    status,
    employeeId,
  });

  const originalColumns: ColumnsType<TSingleConferenceRoomBooking> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (val, item) => (
        <span>
          {item.employee.firstName} {item.employee.lastName}
        </span>
      ),

      // ellipsis: true,

      // width: 100,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => moment(val).format("YYYY-MM-DD"),
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
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Meeting Date",
      dataIndex: "date",
      key: "date",
      render: (val) => moment(val).format("YYYY-MM-DD"),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (val) => moment(val).format("h:mm:ss"),
    },

    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (val) => moment(val).format("h:mm:ss"),
    },

    {
      title: "Status",
      dataIndex: "status",

      key: "status",
      render: (val: string) => (
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
      render: (_, item) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="3"
                  onClick={() => {
                    setShowD(true);
                    setBookingId(item.id);
                  }}
                >
                  View
                </Menu.Item>
                {/* <Menu.Item key="2">Approve</Menu.Item>
                <Menu.Item key="1">Reject</Menu.Item> */}
              </Menu>
            }
            trigger={["click"]}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];
  const columns = employeeId
    ? originalColumns.filter((item) => item.key !== "name")
    : originalColumns;
  return (
    <div>
      <Modal
        open={showD}
        onCancel={() => setShowD(false)}
        closeIcon={false}
        title={"Booking Details"}
        style={{ top: 10 }}
        footer={null}
      >
        {bookingId && <CRBBookingDetails id={bookingId} />}
      </Modal>

      <Table
        columns={columns}
        size="small"
        dataSource={data?.data}
        loading={isFetching}
        pagination={{ ...pagination, total: data?.total }}
        onChange={onChange}
      />
    </div>
  );
};

export default CRBHistoryTable;
